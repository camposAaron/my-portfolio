import { fgContext, fgLogin, fgUrl, navTo } from '../apps/fastgym.mjs'

// Opens the cash register (the seed leaves none open), then sells two products.
export default {
  id: 'fg-pos',
  title: 'Abrir caja y venta en el punto de venta',
  output: 'public/projects/fg/pos',
  prepareContext: fgContext,
  login: fgLogin,
  async setup(r) {
    await r.goto(fgUrl('/cash-session'))
    const page = r.page
    // Wait until the page shows either the opening form or an already open session.
    await r.waitFor(
      page.getByRole('button', { name: 'Abrir caja', exact: true }).or(page.getByRole('button', { name: 'Arqueo y cierre' })),
    )
  },
  async run(r) {
    const { page } = r
    await r.pause(700)

    const openButton = page.getByRole('button', { name: 'Abrir caja', exact: true })
    if (await openButton.isVisible()) {
      await r.pick('#open-gym', 'Fit Center Managua')
      await r.pick('#open-register', process.env.FG_REGISTER || 'Caja Principal FCM')
      await r.type('#open-amount', '1000')
      await r.click(openButton, { after: 1500 })
    }

    await navTo(r, 'Punto de Venta')
    await r.waitFor(page.getByRole('heading', { name: 'Punto de venta' }))
    const products = page.getByRole('list', { name: 'Productos' })

    await r.type(page.getByLabel('Buscar productos'), 'Agua')
    await r.click(products.getByRole('button', { name: /^Agregar Agua/ }).first())
    const cart = page.getByRole('complementary', { name: 'Venta actual' })
    await r.click(cart.getByRole('button', { name: 'Agregar uno' }).first())

    await r.type(page.getByLabel('Buscar productos'), 'Bebida')
    await r.click(products.getByRole('button', { name: /^Agregar Bebida/ }).first())

    await r.click(page.getByRole('button', { name: 'Efectivo exacto' }), { after: 900 })
    await r.click(cart.getByRole('button', { name: /^Cobrar/ }), { after: 600 })
    await r.waitFor(page.getByRole('dialog'))
    await r.pause(2500)
    await r.press('Escape')
  },
}
