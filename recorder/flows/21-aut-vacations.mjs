import { autLogin, autUrl, openSection } from '../apps/autogestion.mjs'

// Fills a vacation request. It is only sent when AUT_SUBMIT=1, because sending
// creates a real request in the environment. With AUT_SHOW_APPROVALS=1 (user with
// the supervisor role) it also opens the approval dialog, without approving.
export default {
  id: 'aut-vacations',
  title: 'Solicitud y aprobación de vacaciones',
  output: 'public/projects/aut/vacations',
  login: autLogin,
  async setup(r) {
    await r.goto(autUrl('/vacations'))
    await r.waitFor(r.page.getByRole('button', { name: 'Nueva solicitud' }))
  },
  async run(r) {
    const { page } = r
    await r.pause(900)
    await r.click(page.getByRole('button', { name: 'Nueva solicitud' }))
    const dialog = page.getByRole('dialog')
    await r.waitFor(dialog.getByText('Nueva solicitud de vacaciones'))

    // PrimeVue Calendar: open it, go to next month, pick an enabled weekday.
    await r.click('#dataInit input', { after: 500 })
    await r.click('.p-datepicker-next', { after: 500 })
    const days = page.locator('.p-datepicker-calendar td:not(.p-datepicker-other-month) > span:not(.p-disabled)')
    await r.click(days.nth(Math.min(8, (await days.count()) - 1)), { after: 600 })

    await r.type('#cantDays input', '2', { after: 1500 })
    await r.type('textarea#observation', 'Viaje familiar')

    if (process.env.AUT_SUBMIT === '1') {
      await r.click(dialog.getByRole('button', { name: 'Solicitar' }), { after: 400 })
      await r.waitFor('.p-toast-message')
      await r.pause(1800)
    } else {
      await r.hover(dialog.getByRole('button', { name: 'Solicitar' }), 1200)
      await r.click(dialog.getByRole('button', { name: 'Cancelar' }))
    }

    if (process.env.AUT_SHOW_APPROVALS === '1') {
      await openSection(r, /Aprobaci[oó]n de solicitudes/, '/requestApprover')
      await r.click(page.locator('.pi-check-circle').first(), { after: 600 })
      const processDialog = page.getByRole('dialog')
      await r.waitFor(processDialog.getByText('Procesar solicitud'))
      await r.type(processDialog.getByPlaceholder('Escribe un comentario...'), 'Aprobado, disfruta tus días')
      await r.hover(processDialog.getByRole('button', { name: 'Aprobar' }), 1300)
      await r.press('Escape')
    }
  },
}
