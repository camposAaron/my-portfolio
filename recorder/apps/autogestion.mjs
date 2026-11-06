// Autogestion (Vue 3 + PrimeVue). Login goes through the backend to Cognito, so it
// needs a real user of the environment in AUT_URL (local frontend or the DEV site).
import { env } from '../lib/recorder.mjs'

export const autUrl = (path = '') => new URL(path, env('AUT_URL')).toString()

export async function autLogin(page) {
  await page.goto(autUrl('/login'), { waitUntil: 'networkidle' })
  await page.locator('#email').fill(env('AUT_EMAIL'))
  // PrimeVue Password puts the id on its wrapper div.
  await page.locator('#password input').fill(env('AUT_PASSWORD'))
  await page.locator('#login-form button[type=submit]').click()
  await page.waitForURL(/\/(home|update)/, { timeout: 30000 })
  if (page.url().includes('/update')) {
    throw new Error('This user must change a temporary password first; log in once by hand.')
  }
}

// Clicks a visible menu entry or card by its text; navigates directly if none is on screen.
export async function openSection(r, text, path) {
  const link = r.page.getByText(text).first()
  if (await link.isVisible().catch(() => false)) {
    await r.click(link, { after: 300 })
  } else {
    await r.goto(autUrl(path))
  }
  await r.page.waitForLoadState('networkidle')
  await r.pause(900)
}

// AI mode is behind the Flagsmith flag `ai_mode`. With AUT_FORCE_AI_FLAG=1 the
// flag responses are patched in the browser so the toggle shows even if it is off.
export async function forceAiFlag(page) {
  if (process.env.AUT_FORCE_AI_FLAG !== '1') return
  const patch = (flags) => {
    const list = Array.isArray(flags) ? flags : []
    const flag = list.find((f) => f.feature?.name === 'ai_mode')
    if (flag) flag.enabled = true
    else list.push({ enabled: true, feature_state_value: null, feature: { id: 0, name: 'ai_mode', type: 'STANDARD' } })
    return list
  }
  await page.route(/\/(flags|identities)\/?(\?|$)/, async (route) => {
    const response = await route.fetch()
    let body = await response.json().catch(() => null)
    if (Array.isArray(body)) body = patch(body)
    else if (body && typeof body === 'object' && 'flags' in body) body.flags = patch(body.flags)
    await route.fulfill({ response, json: body })
  })
}
