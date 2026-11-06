import { fgContext, fgLogin, fgUrl, navTo } from '../apps/fastgym.mjs'

// Recorded after attendance and POS so the KPIs and charts have data.
export default {
  id: 'fg-dashboard',
  title: 'Dashboard y reportes',
  output: 'public/projects/fg/dashboard',
  prepareContext: fgContext,
  login: fgLogin,
  async setup(r) {
    await r.goto(fgUrl('/home'))
    await r.waitFor(r.page.getByRole('heading', { name: 'Dashboard' }))
  },
  async run(r) {
    const { page } = r
    await r.pause(700)
    for (const kpi of ['Asistencias hoy', 'Socios activos', 'Cobros de hoy', 'Cajas abiertas']) {
      await r.hover(page.getByText(kpi, { exact: true }).first(), 500)
    }
    const range = page.getByRole('tablist', { name: 'Rango de días' }).getByRole('tab')
    await r.click(range.nth(1), { after: 1000 })
    await r.scrollTo(page.getByText('Ventas POS del mes').first(), { duration: 1200 })
    await r.pause(1500)

    await navTo(r, 'Reportes')
    const reports = page.getByRole('tablist', { name: 'Reportes' })
    await r.waitFor(reports)
    for (const tab of ['Ventas POS', 'Asistencias', 'Membresías']) {
      await r.click(reports.getByRole('tab', { name: tab }), { after: 1200 })
    }
    await r.hover(page.getByRole('button', { name: 'Exportar CSV' }), 1200)
  },
}
