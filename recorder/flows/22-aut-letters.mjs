import { autLogin, autUrl } from '../apps/autogestion.mjs'

// Needs an admin user. Fills a new letter configuration and opens the editor
// without saving anything.
export default {
  id: 'aut-letters',
  title: 'Configuración de cartas',
  output: 'public/projects/aut/letter-settings',
  login: autLogin,
  async setup(r) {
    await r.goto(autUrl('/letterConfigs'))
    await r.waitFor(r.page.getByRole('heading', { name: 'Configuraciones de cartas' }))
  },
  async run(r) {
    const { page } = r
    await r.pause(900)
    await r.hover(page.locator('tbody tr').first(), 900)
    await r.click(page.getByRole('button', { name: 'Crear nueva carta' }), { after: 1000 })
    await r.waitFor('#name')
    await r.type('#name', 'Constancia laboral')
    await r.type('#description', 'Certifica el puesto, la antigüedad y el salario del colaborador')
    await r.pick('#generationType')
    await r.scrollTo(page.getByRole('button', { name: 'Abrir editor' }))
    await r.click(page.getByRole('button', { name: 'Abrir editor' }), { after: 2800 })
    await r.press('Escape')
  },
}
