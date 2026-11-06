// FastGym (React + Radix). Runs locally: `pnpm dev` in the fastgym repo serves the
// client on :3001 and the API on :3000. Users come from apps/api/prisma/seed.ts.
import { execFile } from 'node:child_process'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import { env, RECORDER_DIR } from '../lib/recorder.mjs'

// Chromium flags for a fake webcam showing a plain dark frame, so the kiosk shows a
// live camera instead of a "camera unavailable" error. Generates the clip once.
export async function fakeCameraArgs() {
  const file = path.join(RECORDER_DIR, '.raw', 'camera.y4m')
  if (!existsSync(file)) {
    await mkdir(path.dirname(file), { recursive: true })
    await promisify(execFile)(process.env.FFMPEG || 'ffmpeg', [
      '-loglevel', 'error', '-f', 'lavfi', '-i', 'color=c=0x23272e:s=640x480:r=15,noise=alls=5:allf=t',
      '-t', '3', '-pix_fmt', 'yuv420p', file,
    ])
  }
  return ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream', `--use-file-for-fake-video-capture=${file}`]
}

export const fgUrl = (path = '') => new URL(path, env('FG_URL', 'http://localhost:3001')).toString()

// The Vite client proxies /api, /uploads and /models to :3000. When the API has to
// run on another port (FG_API_URL), the recording browser sends those calls there.
export async function fgContext(ctx) {
  const api = process.env.FG_API_URL
  if (!api) return
  const client = new URL(fgUrl())
  const pattern = new RegExp(`^${client.origin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/(api|uploads|models)(/|$)`)
  await ctx.route(pattern, async (route) => {
    const url = new URL(route.request().url())
    const target = new URL(url.pathname + url.search, api).toString()
    const response = await route.fetch({ url: target })
    await route.fulfill({ response })
  })
}

export async function fgLogin(page) {
  await page.goto(fgUrl('/'), { waitUntil: 'networkidle' })
  await page.locator('#email').fill(env('FG_EMAIL', 'owner@fastgym.dev'))
  await page.locator('#password').fill(env('FG_PASSWORD'))
  await page.getByRole('button', { name: 'Iniciar sesión' }).click()
  await page.waitForURL(/\/home/, { timeout: 20000 })
}

// Clicks an entry of the main sidebar by its label (Dashboard, Socios, Punto de Venta…).
export async function navTo(r, label) {
  const sidebar = r.page.getByRole('complementary', { name: 'Navegación principal' })
  await r.click(sidebar.getByRole('link', { name: label, exact: true }), { after: 300 })
  await r.page.waitForLoadState('networkidle')
  await r.pause(800)
}
