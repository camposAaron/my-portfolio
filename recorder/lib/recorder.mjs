import { chromium } from 'playwright'
import { execFile } from 'node:child_process'
import { mkdir, rm } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { cursorScript } from './cursor.mjs'
import { Director } from './director.mjs'

const run = promisify(execFile)

export const RECORDER_DIR = path.resolve(import.meta.dirname, '..')
export const PORTFOLIO_DIR = path.resolve(RECORDER_DIR, '..')
// The site shows recordings at 1280×630 (see .player__screen in assets/css/main.css).
// Record a slightly larger viewport with the same ratio, then downscale for sharpness.
export const VIEWPORT = { width: 1440, height: 709 }
export const OUTPUT_SIZE = { width: 1280, height: 630 }

/**
 * Records one flow:
 *  0. prepareContext (optional) runs on every browser context, e.g. to add routes;
 *  1. login (optional) in an unrecorded context, keeping its cookies/storage;
 *  2. setup (optional) navigates to the first screen — recorded, then trimmed away;
 *  3. run is the part that ends up in the video.
 * Writes <output>.webm and <output>-poster.jpg and returns the duration.
 */
export async function record(flow, { headed = false } = {}) {
  const viewport = flow.viewport ?? VIEWPORT
  const args = typeof flow.launchArgs === 'function' ? await flow.launchArgs() : (flow.launchArgs ?? [])
  const browser = await chromium.launch({ headless: !headed, args })
  const rawDir = path.join(RECORDER_DIR, '.raw', flow.id)
  await rm(rawDir, { recursive: true, force: true })

  try {
    let storageState
    if (flow.login) {
      const ctx = await browser.newContext({ viewport, locale: flow.locale ?? 'es-MX' })
      await flow.prepareContext?.(ctx)
      const page = await ctx.newPage()
      await flow.login(page)
      storageState = await ctx.storageState()
      await ctx.unrouteAll({ behavior: 'ignoreErrors' })
      await ctx.close()
    }

    const ctx = await browser.newContext({
      viewport,
      storageState,
      locale: flow.locale ?? 'es-MX',
      colorScheme: flow.colorScheme ?? 'light',
      permissions: flow.permissions,
      recordVideo: { dir: rawDir, size: viewport },
    })
    await flow.prepareContext?.(ctx)
    await ctx.addInitScript(cursorScript)
    const page = await ctx.newPage()
    const videoStart = Date.now()
    const r = new Director(page, viewport)

    await flow.setup?.(r)
    // Don't start the video (or its poster) on loading placeholders.
    await page
      .waitForFunction(() => !document.querySelector('.animate-pulse, .p-skeleton'), null, { timeout: 10000 })
      .catch(() => {})
    await r.showCursor()
    await r.pause(400)
    const trimStart = (Date.now() - videoStart) / 1000

    try {
      await flow.run(r)
    } catch (err) {
      const shot = path.join(rawDir, 'failure.png')
      await page.screenshot({ path: shot }).catch(() => {})
      err.message += `\nScreenshot at failure: ${shot}`
      throw err
    }
    await r.pause(flow.tail ?? 1200)

    const video = page.video()
    await ctx.unrouteAll({ behavior: 'ignoreErrors' })
    await ctx.close()
    const raw = await video.path()
    return await finalize(raw, trimStart, flow.output)
  } finally {
    await browser.close()
  }
}

async function finalize(raw, trimStart, output) {
  // Read here, not at import time: record.mjs loads .env after its imports run.
  const FFMPEG = process.env.FFMPEG || 'ffmpeg'
  const FFPROBE = process.env.FFPROBE || 'ffprobe'
  const base = path.resolve(PORTFOLIO_DIR, output)
  await mkdir(path.dirname(base), { recursive: true })
  const webm = `${base}.webm`
  const poster = `${base}-poster.jpg`

  // VP9 re-encode: trims the setup, drops audio and shrinks the file for the web.
  await run(FFMPEG, [
    '-y', '-loglevel', 'error', '-ss', trimStart.toFixed(2), '-i', raw, '-an',
    // setsar=1: the viewport ratio isn't exactly 1280:630, so force square pixels.
    '-vf', `scale=${OUTPUT_SIZE.width}:${OUTPUT_SIZE.height}:flags=lanczos,setsar=1`,
    '-c:v', 'libvpx-vp9', '-crf', '30', '-b:v', '0', '-row-mt', '1', '-deadline', 'good', '-cpu-used', '4',
    webm,
  ])
  await run(FFMPEG, ['-y', '-loglevel', 'error', '-ss', '0.3', '-i', webm, '-frames:v', '1', '-q:v', '3', poster])

  const { stdout } = await run(FFPROBE, [
    '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', webm,
  ])
  const seconds = Math.round(parseFloat(stdout))
  const duration = `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`
  return { webm, poster, duration }
}

export function env(name, fallback) {
  const value = process.env[name] ?? fallback
  if (value === undefined || value === '') {
    throw new Error(`Missing ${name}: add it to recorder/.env (see .env.example)`)
  }
  return value
}
