import { autLogin, autUrl, openSection } from '../apps/autogestion.mjs'

export default {
  id: 'aut-home',
  title: 'Inicio del colaborador y módulos',
  output: 'public/projects/aut/home',
  login: autLogin,
  async setup(r) {
    await r.goto(autUrl('/home'))
    await r.waitFor('#welcome-message')
  },
  async run(r) {
    const { page } = r
    await r.pause(900)
    await r.hover('#welcome-message', 600)
    const groups = page.getByText(/^Módulos de/)
    const count = await groups.count()
    for (let i = 0; i < Math.min(count, 3); i++) {
      await r.scrollTo(groups.nth(i), { duration: 700 })
      await r.pause(700)
    }

    await openSection(r, 'Comprobantes de pago', '/receipts')
    await r.waitFor(page.getByRole('heading', { name: 'Comprobantes de pago' }))
    await r.hover(page.locator('tbody tr').first(), 1200)

    await openSection(r, 'Documentos y políticas', '/documents&Policies')
    await r.waitFor(page.getByRole('heading', { name: 'Documentos y políticas' }))
    await r.pause(1500)
  },
}
