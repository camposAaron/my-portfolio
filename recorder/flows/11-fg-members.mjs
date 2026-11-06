import { fgContext, fgLogin, fgUrl } from '../apps/fastgym.mjs'

export default {
  id: 'fg-members',
  title: 'Alta de un socio y su ficha',
  output: 'public/projects/fg/members',
  prepareContext: fgContext,
  login: fgLogin,
  async setup(r) {
    await r.goto(fgUrl('/socios'))
    await r.waitFor(r.page.getByLabel('Buscar socios'))
  },
  async run(r) {
    const { page } = r
    await r.pause(700)
    await r.click(page.getByRole('button', { name: 'Nuevo socio' }).first())
    await r.waitFor('#firstName')

    // A unique email lets the list search find exactly this member afterwards.
    const email = `valeria.rodriguez${Date.now() % 100000}@example.com`
    await r.type('#firstName', 'Valeria')
    await r.type('#lastName', 'Rodríguez')
    await r.type('#email', email)
    await r.type('#phone', '8888 1234')
    await r.pick('#gender', 'Femenino')

    // Initial payment: charges the first membership into the register fg-pos opened,
    // so the member has an active membership for the kiosk check-in that follows.
    await r.scrollTo('#membershipId', { duration: 800 })
    const cashPicker = page.getByRole('combobox', { name: 'Caja', exact: true })
    if (await cashPicker.isEnabled().catch(() => false)) {
      await r.pick(cashPicker, process.env.FG_REGISTER || 'Caja Principal FCM')
    }
    await r.pick('#membershipId')
    await r.hover('#amount', 900)
    await r.click(page.getByRole('button', { name: 'Crear socio' }), { after: 1500 })

    // After creating, the app returns to the member list: open the new member.
    const tabs = page.getByRole('tablist', { name: 'Secciones del socio' })
    if (!(await tabs.isVisible().catch(() => false))) {
      await r.type(page.getByLabel('Buscar socios'), email.split('@')[0], { delay: 30, after: 1200 })
      await r.click(page.getByRole('button', { name: 'Abrir' }).first(), { after: 1000 })
    }
    await r.waitFor(tabs)
    for (const i of [1, 3, 0]) await r.click(tabs.getByRole('tab').nth(i), { after: 1100 })
  },
}
