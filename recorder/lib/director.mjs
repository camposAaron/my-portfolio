// High-level, human-paced actions for recorded flows. Every action moves the
// visible cursor smoothly before acting, so the video reads like a person using the app.
export class Director {
  constructor(page, viewport) {
    this.page = page
    this.viewport = viewport
    this.mouse = { x: viewport.width / 2, y: viewport.height / 2 }
  }

  loc(target) {
    return typeof target === 'string' ? this.page.locator(target).first() : target
  }

  pause(ms = 600) {
    return this.page.waitForTimeout(ms)
  }

  async goto(url, { waitUntil = 'networkidle' } = {}) {
    await this.page.goto(url, { waitUntil })
    await this.showCursor()
  }

  // Re-announce the mouse position so the cursor appears on a freshly loaded document.
  async showCursor() {
    await this.page.mouse.move(this.mouse.x + 1, this.mouse.y)
    await this.page.mouse.move(this.mouse.x, this.mouse.y)
  }

  async waitFor(target, { timeout = 15000, state = 'visible' } = {}) {
    await this.loc(target).waitFor({ state, timeout })
  }

  async moveTo(target, { offset } = {}) {
    const el = this.loc(target)
    await el.waitFor({ state: 'visible' })
    await el.scrollIntoViewIfNeeded()
    const box = await el.boundingBox()
    if (!box) throw new Error(`No bounding box for ${target}`)
    const x = box.x + (offset?.x ?? box.width / 2)
    const y = box.y + (offset?.y ?? box.height / 2)
    await this.moveToPoint(x, y)
  }

  // Time-based ease-in-out: the move takes the same time however slow each
  // mouse event is on a heavy page, so the video pace stays predictable.
  async moveToPoint(x, y, { duration } = {}) {
    const from = { ...this.mouse }
    const dist = Math.hypot(x - from.x, y - from.y)
    const ms = duration ?? Math.min(1100, Math.max(350, dist * 0.9))
    const start = Date.now()
    for (;;) {
      const t = Math.min(1, (Date.now() - start) / ms)
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      await this.page.mouse.move(from.x + (x - from.x) * e, from.y + (y - from.y) * e)
      if (t === 1) break
      await this.page.waitForTimeout(10)
    }
    this.mouse = { x, y }
  }

  async hover(target, ms = 700) {
    await this.moveTo(target)
    await this.pause(ms)
  }

  async click(target, { before = 250, after = 700, offset } = {}) {
    await this.moveTo(target, { offset })
    await this.pause(before)
    await this.page.mouse.down()
    await this.pause(70)
    await this.page.mouse.up()
    await this.pause(after)
  }

  async type(target, text, { delay = 55, clear = true, after = 400 } = {}) {
    await this.click(target, { after: 200 })
    if (clear) await this.loc(target).fill('')
    await this.page.keyboard.type(text, { delay })
    await this.pause(after)
  }

  async press(key, { after = 500 } = {}) {
    await this.page.keyboard.press(key)
    await this.pause(after)
  }

  // Custom dropdowns (Radix Select, PrimeVue Dropdown): open the trigger, then
  // click the option by accessible name, or the first option when none is given.
  async pick(trigger, option, { after = 600 } = {}) {
    await this.click(trigger, { after: 450 })
    const options = this.page.getByRole('option')
    const target = option === undefined ? options.first() : options.filter({ hasText: option }).first()
    // Long lists auto-scroll while the cursor travels over them, so the option can
    // move away from where it was measured: glide there, then let Playwright click
    // it at its current position (the visible cursor follows the real mouse).
    await this.moveTo(target)
    await this.pause(200)
    await target.click()
    const box = await target.boundingBox().catch(() => null)
    if (box) this.mouse = { x: box.x + box.width / 2, y: box.y + box.height / 2 }
    await this.pause(after)
  }

  async select(target, value, { after = 600 } = {}) {
    await this.moveTo(target)
    await this.loc(target).selectOption(value)
    await this.pause(after)
  }

  // Smooth wheel scroll by a pixel amount (negative scrolls up).
  // Time-based like moveToPoint: wheel deltas follow an ease-in-out curve over `duration`.
  async scroll(deltaY, { duration = 900 } = {}) {
    const start = Date.now()
    let done = 0
    for (;;) {
      const t = Math.min(1, (Date.now() - start) / duration)
      const e = t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2
      const step = deltaY * e - done
      if (Math.abs(step) >= 1) {
        await this.page.mouse.wheel(0, step)
        done += step
      }
      if (t === 1) break
      await this.page.waitForTimeout(10)
    }
    await this.pause(400)
  }

  // Smoothly scroll until the element sits near the middle of the viewport.
  async scrollTo(target, { duration = 900 } = {}) {
    const box = await this.loc(target).boundingBox()
    if (!box) throw new Error(`No bounding box for ${target}`)
    const delta = box.y + box.height / 2 - this.viewport.height / 2
    if (Math.abs(delta) > 4) await this.scroll(delta, { duration })
  }

  // Wait until an element's text stops changing, e.g. a streamed AI answer.
  async waitForStable(target, { quiet = 1500, timeout = 90000 } = {}) {
    const el = this.loc(target)
    await el.waitFor({ state: 'visible', timeout })
    const end = Date.now() + timeout
    let last = await el.innerText()
    let since = Date.now()
    while (Date.now() < end) {
      await this.page.waitForTimeout(250)
      const now = await el.innerText()
      if (now !== last) {
        last = now
        since = Date.now()
      } else if (Date.now() - since >= quiet && now.trim()) {
        return
      }
    }
    throw new Error(`Text of ${target} never settled`)
  }
}
