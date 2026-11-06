import { fakeCameraArgs, fgContext, fgLogin, fgUrl } from '../apps/fastgym.mjs'

// Checks in the member fg-members just created (active membership → access granted).
// A fake webcam keeps the camera panel live instead of showing an error.
export default {
  id: 'fg-attendance',
  title: 'Marcaje manual en el kiosco',
  output: 'public/projects/fg/attendance',
  launchArgs: fakeCameraArgs,
  permissions: ['camera'],
  prepareContext: fgContext,
  login: fgLogin,
  async setup(r) {
    await r.goto(fgUrl('/attendance/kiosk'))
    await r.waitFor(r.page.getByLabel('Buscar socio'))
  },
  async run(r) {
    const { page } = r
    await r.pause(700)
    await r.hover(page.getByLabel('Vista de la cámara'), 900)
    await r.type(page.getByLabel('Buscar socio'), process.env.FG_MEMBER_SEARCH || 'Valeria Rodr')
    const results = page.getByRole('list', { name: 'Resultados' })
    await r.waitFor(results)
    await r.pause(600)
    await r.click(results.getByRole('button', { name: 'Marcar ingreso' }).first(), { after: 2200 })
    await r.hover(page.getByText('Últimos marcajes', { exact: true }), 1800)
  },
}
