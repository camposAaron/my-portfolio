import { autLogin, autUrl, forceAiFlag } from '../apps/autogestion.mjs'

// Opens AI mode from the header and asks Apsi a few questions. The chat lives in
// the <ia-mode> custom element (open shadow root); Playwright locators pierce it.
const DEFAULT_QUESTIONS = [
  '¿Cuántos días de vacaciones tengo disponibles?',
  'Quiero solicitar 2 días de vacaciones el próximo viernes',
]

export default {
  id: 'aut-ai',
  title: 'Modo IA: preguntas a Apsi',
  output: 'public/projects/aut-ai/chat',
  login: autLogin,
  tail: 2000,
  async setup(r) {
    await forceAiFlag(r.page)
    await r.goto(autUrl('/home'))
    await r.waitFor('.ia-mode-toggle', { timeout: 20000 }).catch(() => {
      throw new Error('AI mode toggle not found: the ai_mode flag is off. Try AUT_FORCE_AI_FLAG=1.')
    })
  },
  async run(r) {
    const { page } = r
    const questions = process.env.AUT_AI_QUESTIONS?.split('|').map((q) => q.trim()).filter(Boolean) ?? DEFAULT_QUESTIONS

    await r.pause(800)
    await r.click('.ia-mode-toggle', { after: 400 })
    const input = page.getByPlaceholder('Pregúntale algo a Apsi...')
    await r.waitFor(input, { timeout: 30000 })
    await page.getByText('Cargando tu conversación...').waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {})
    await r.pause(1200)

    for (const question of questions) {
      await r.type(input, question, { delay: 45 })
      await r.press('Enter', { after: 300 })
      const thinking = page.getByText(/Apsi está pensando/)
      await thinking.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {})
      await thinking.waitFor({ state: 'hidden', timeout: 120000 })
      await r.waitForStable(page.locator('ia-mode .prose').last(), { quiet: 1200 })
      await r.moveToPoint(r.viewport.width * 0.62, r.viewport.height * 0.55)
      await r.pause(2600)
    }
  },
}
