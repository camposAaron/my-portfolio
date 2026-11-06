// Smoke test for the recorder: scrolls the portfolio itself. Not used on the site.
import { env } from '../lib/recorder.mjs'

export default {
  id: 'portfolio-demo',
  title: 'Recorder smoke test',
  smokeTest: true,
  output: 'recorder/.raw/portfolio-demo/out',
  async setup(r) {
    await r.goto(env('PORTFOLIO_URL', 'http://localhost:3000'))
  },
  async run(r) {
    await r.pause(800)
    await r.scroll(900, { duration: 1400 })
    await r.moveToPoint(900, 420)
    await r.pause(500)
    await r.scroll(900, { duration: 1400 })
    await r.pause(600)
  },
}
