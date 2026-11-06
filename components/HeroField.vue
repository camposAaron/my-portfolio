<script setup>
// A generated ASCII field behind the hero: noise sampled per 8x16 cell into a character ramp,
// tinted in coral. Streams of "traffic" (events and commands from the stack) enter from the left
// and converge on the cube; the area behind the hero text stays nearly empty so it reads cleanly.
// Runs at ~30 fps with a pointer lens, pauses off screen, with the hero's Pause button and in a
// hidden tab, and is drawn once as a still under prefers-reduced-motion. Without script, the
// hero's CSS dot grid stands in.
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useHeroMotion } from '~/composables/useHeroMotion'

const canvasRef = ref(null)
const { held } = useHeroMotion()

const CELL_W = 8
const CELL_H = 16
const RAMP = ' .:-=+*#%@'
const ROW_RAMP = ' .:|'
// Coral (#FF7865, --color-accent) at rising strengths, from faint to the densest cells.
const TINTS = [0.1, 0.17, 0.27, 0.4, 0.58, 0.8].map((a) => `rgba(255, 120, 101, ${a})`)
const TOKEN_TINT = 'rgba(255, 144, 127, 0.78)'
const GLYPHS = [...new Set((RAMP + ROW_RAMP).replace(/ /g, ''))]
const GLYPH_INDEX = Object.fromEntries(GLYPHS.map((g, i) => [g, i]))
const FONT = '400 13px "Atkinson Hyperlegible Mono", ui-monospace, monospace'
const GROUND = '#101416'
const TOKENS = [
  '{"type":"leave.requested"}',
  '{"type":"receipt.ready"}',
  '{"type":"policy.updated"}',
  '{"status":"approved"}',
  'GET /api/vacations 200',
  'POST /api/letters 201',
  'kubectl rollout status',
  'docker build -t autogestion .',
  'aws s3 cp receipt.pdf',
]

// ---- Gradient noise (2D Perlin), seeded so the field looks the same on every load
const perm = new Uint8Array(512)
;(() => {
  const p = Array.from({ length: 256 }, (_, i) => i)
  let s = 1337
  for (let i = 255; i > 0; i--) {
    s = (s * 16807) % 2147483647
    const j = s % (i + 1)
    ;[p[i], p[j]] = [p[j], p[i]]
  }
  for (let i = 0; i < 512; i++) perm[i] = p[i & 255]
})()
const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10)
const lerp = (a, b, t) => a + (b - a) * t
function grad(h, x, y) {
  switch (h & 7) {
    case 0: return x + y
    case 1: return -x + y
    case 2: return x - y
    case 3: return -x - y
    case 4: return x
    case 5: return -x
    case 6: return y
    default: return -y
  }
}
function noise(x, y) {
  const X = Math.floor(x) & 255
  const Y = Math.floor(y) & 255
  x -= Math.floor(x)
  y -= Math.floor(y)
  const u = fade(x)
  const v = fade(y)
  const a = perm[X] + Y
  const b = perm[X + 1] + Y
  return lerp(
    lerp(grad(perm[a], x, y), grad(perm[b], x - 1, y), u),
    lerp(grad(perm[a + 1], x, y - 1), grad(perm[b + 1], x - 1, y - 1), u),
    v,
  )
}
const smooth = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)))
  return t * t * (3 - 2 * t)
}

let ctx = null
let atlas = null
let atlasScale = 1
let hero = null
let W = 0
let H = 0
let geo = null
let tokens = []
let pointer = null
let raf = 0
let last = 0
let time = 12
let visible = false
let reduce = false
let ro = null
let io = null
let mq = null

function measure() {
  const canvas = canvasRef.value
  if (!canvas || !hero) return
  const r = hero.getBoundingClientRect()
  W = r.width
  H = r.height
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = Math.round(W * dpr)
  canvas.height = Math.round(H * dpr)
  canvas.style.width = `${W}px`
  canvas.style.height = `${H}px`
  ctx = canvas.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.font = FONT
  ctx.textBaseline = 'top'

  // Pre-draw each glyph in each tint once; frames copy cells from here instead of calling fillText.
  atlasScale = dpr
  atlas = document.createElement('canvas')
  atlas.width = Math.ceil(GLYPHS.length * CELL_W * dpr)
  atlas.height = Math.ceil(TINTS.length * CELL_H * dpr)
  const actx = atlas.getContext('2d')
  actx.setTransform(dpr, 0, 0, dpr, 0, 0)
  actx.font = FONT
  actx.textBaseline = 'top'
  TINTS.forEach((tint, ti) => {
    actx.fillStyle = tint
    GLYPHS.forEach((g, gi) => actx.fillText(g, gi * CELL_W, ti * CELL_H))
  })

  const rel = (el) => {
    if (!el) return null
    const b = el.getBoundingClientRect()
    return { x: b.left - r.left, y: b.top - r.top, w: b.width, h: b.height }
  }
  const cube = rel(hero.querySelector('.cube-container'))
  const text = rel(hero.querySelector('.hero__text'))
  const caption = rel(hero.querySelector('.cube-stage figcaption'))
  const cx = cube ? cube.x + cube.w / 2 : W * 0.75
  const cy = cube ? cube.y + cube.h / 2 : H * 0.5
  const ring = cube ? cube.w * 0.95 : Math.min(W, H) * 0.25
  const narrow = W < 960
  const textBottom = text ? (text.y + text.h) / H : 0.85
  const ys = narrow
    ? [textBottom + (1 - textBottom) * 0.15, textBottom + (1 - textBottom) * 0.45, 0.985]
    : [0.03, 0.1, 0.17, Math.min(0.95, textBottom + 0.06), Math.min(0.97, textBottom + 0.11), 0.985]
  geo = {
    cx,
    cy,
    ring,
    narrow,
    // Areas kept clear so the copy and the cube's caption read cleanly
    clear: [text, caption].filter(Boolean).map((b, i) => (i === 0
      ? { x: b.x - 32, y: b.y - 24, w: b.w + 64, h: b.h + 48 }
      : { x: b.x - 16, y: b.y - 8, w: b.w + 32, h: b.h + 16 })),
    streams: ys.map((f, i) => ({
      y0: H * f,
      w: 12 + (i % 3) * 7,
      speed: 0.9 + (i % 4) * 0.35,
      gain: 0.85 + ((i * 37) % 10) / 30,
      ph: i * 7.31,
    })),
  }
  tokens = Array.from({ length: Math.min(narrow ? 3 : 5, ys.length) }, (_, i) => spawn(i, true))
}

// Streams run edge to edge along the top and bottom bands and pinch toward the cube as they pass it.
function streamY(s, x) {
  const span = geo.narrow ? W * 0.45 : W * 0.22
  const pinch = Math.exp(-((x - geo.cx) * (x - geo.cx)) / (span * span))
  return s.y0 + (geo.cy - s.y0) * 0.42 * pinch + noise(x * 0.004 + s.ph, time * 0.08) * 18
}

function textMask(x, y) {
  let m = 0
  for (const t of geo.clear) {
    const dx = Math.max(t.x - x, 0, x - (t.x + t.w))
    const dy = Math.max(t.y - y, 0, y - (t.y + t.h))
    const v = 1 - smooth(0, 56, Math.hypot(dx, dy))
    if (v > m) m = v
  }
  return m
}

function spawn(i, scatter = false) {
  const text = TOKENS[(i * 5 + Math.floor(Math.random() * TOKENS.length)) % TOKENS.length]
  // One token per stream, so tokens never run into each other.
  const s = i % geo.streams.length
  const len = text.length * CELL_W
  const end = W
  return { text, s, len, x: scatter ? Math.random() * end - len : -len - Math.random() * 300, speed: 26 + Math.random() * 30 }
}

function draw(dt) {
  if (!ctx || !geo) return
  ctx.clearRect(0, 0, W, H)
  const cols = Math.ceil(W / CELL_W)
  const rows = Math.ceil(H / CELL_H)
  const { cx, cy, ring, streams } = geo
  const sw = CELL_W * atlasScale
  const sh = CELL_H * atlasScale

  // Each stream's centre line, once per column
  const centres = streams.map((st) => {
    const a = new Float32Array(cols)
    for (let c = 0; c < cols; c++) a[c] = streamY(st, c * CELL_W + CELL_W / 2)
    return a
  })
  const sparkle = time * 0.05

  for (let r = 0; r < rows; r++) {
    const y = r * CELL_H + CELL_H / 2
    const v = y / H
    for (let c = 0; c < cols; c++) {
      const x = c * CELL_W + CELL_W / 2

      // Cheap exits: deep behind the copy, or inside the cube's clear space
      const tm = textMask(x, y)
      if (tm > 0.97) continue
      const dc = Math.hypot(x - cx, y - cy)
      if (dc < ring * 0.55) continue

      let d = 0

      // Streams of traffic flowing past the cube
      for (let i = 0; i < streams.length; i++) {
        const st = streams[i]
        const dy = y - centres[i][c]
        if (dy > st.w * 2 || dy < -st.w * 2) continue
        const band = Math.exp(-(dy * dy) / (st.w * st.w))
        const pulse = 0.5 + 0.5 * noise(x * 0.016 - time * st.speed, y * 0.04 + st.ph)
        const val = band * (0.35 + 0.75 * pulse) * st.gain
        if (val > d) d = val
      }

      // Raw masses in the left corners
      const u = x / W
      const corner = Math.max(Math.exp(-(u * u) / 0.09 - (v * v) / 0.06), Math.exp(-(u * u) / 0.2 - ((1 - v) * (1 - v)) / 0.06))
      if (corner > 0.05) {
        const nb = 0.5 + 0.5 * (noise(x * 0.007 + time * 0.05, y * 0.014 - time * 0.03) * 0.7 + noise(x * 0.02, y * 0.04 + time * 0.08) * 0.3)
        const m = nb * corner * 1.45
        if (m > d) d = m
      }

      // Resolved traffic: dotted rows on the cube's far side
      const resolvedRow = x > cx && r % 3 === 1
      if (resolvedRow) {
        const row = noise(x * 0.01 + r * 1.7, time * 0.15)
        if (row > -0.25) {
          const m = 0.24 + 0.22 * smooth(-0.25, 0.6, row)
          if (m > d) d = m
        }
      }

      // A faint, slowly drifting scatter so the whole hero reads as one field
      if (d < 0.13) {
        const h = (((c * 73856093) ^ (r * 19349663)) >>> 0) % 1000
        if ((h / 1000 + sparkle) % 1 < 0.05) d = 0.13
      }

      if (dc < ring) d *= smooth(ring * 0.55, ring, dc)

      // Pointer lens
      if (pointer) {
        const dp = Math.hypot(x - pointer.x, y - pointer.y)
        if (dp < 140) d += 0.45 * Math.exp(-(dp * dp) / (90 * 90))
      }

      // Keep the copy readable
      d = Math.min(d, 1) * (1 - 0.92 * tm)
      if (d < 0.12) continue

      const resolved = resolvedRow && dc >= ring
      const ch = resolved ? ROW_RAMP[Math.min(3, 1 + Math.floor(d * 4))] : RAMP[Math.min(RAMP.length - 1, Math.floor(d * RAMP.length))]
      if (ch === ' ') continue
      const ti = Math.min(TINTS.length - 1, Math.floor(d * TINTS.length))
      ctx.drawImage(atlas, GLYPH_INDEX[ch] * sw, ti * sh, sw, sh, c * CELL_W, r * CELL_H, CELL_W, CELL_H)
    }
  }

  // Tokens riding the streams
  const end = W
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i]
    t.x += t.speed * dt
    if (t.x > end) {
      tokens[i] = spawn(i)
      continue
    }
    const s = streams[t.s]
    const row = Math.round(streamY(s, t.x + t.len / 2) / CELL_H)
    const y = row * CELL_H
    const startCol = Math.round(t.x / CELL_W)
    for (let k = 0; k < t.text.length; k++) {
      const x = (startCol + k) * CELL_W
      if (x < 0 || x > end) continue
      if (textMask(x + CELL_W / 2, y + CELL_H / 2) > 0.2) continue
      if (Math.hypot(x + CELL_W / 2 - cx, y + CELL_H / 2 - cy) < ring) continue
      const edge = Math.min(1, (end - x) / 80, (x + 40) / 80)
      ctx.fillStyle = GROUND
      ctx.fillRect(x, y, CELL_W, CELL_H)
      ctx.globalAlpha = Math.max(0, edge)
      ctx.fillStyle = TOKEN_TINT
      ctx.fillText(t.text[k], x, y)
      ctx.globalAlpha = 1
    }
  }
}

function frame(now) {
  raf = 0
  if (!running()) return
  const dt = last ? Math.min(0.1, (now - last) / 1000) : 0
  if (!last || now - last >= 33) {
    time += dt
    draw(dt)
    last = now
  }
  raf = requestAnimationFrame(frame)
}

const running = () => visible && !held.value && !reduce && !document.hidden

function start() {
  if (running() && !raf) {
    last = 0
    raf = requestAnimationFrame(frame)
  }
}
function stop() {
  if (raf) cancelAnimationFrame(raf)
  raf = 0
}
function sync() {
  if (running()) start()
  else {
    stop()
    draw(0) // leave a composed still
  }
}

function onPointerMove(e) {
  const r = hero.getBoundingClientRect()
  pointer = { x: e.clientX - r.left, y: e.clientY - r.top }
  if (!running()) draw(0)
}
function onPointerLeave() {
  pointer = null
  if (!running()) draw(0)
}
const onVisibility = () => sync()
const onMotionChange = () => {
  reduce = mq.matches
  sync()
}

watch(held, sync)

onMounted(async () => {
  hero = canvasRef.value?.parentElement
  if (!hero) return
  mq = window.matchMedia('(prefers-reduced-motion: reduce)')
  reduce = mq.matches
  mq.addEventListener('change', onMotionChange)
  // Wait for the mono face so the glyphs sit on their cells.
  try { await document.fonts.load('13px "Atkinson Hyperlegible Mono"') } catch {}
  measure()
  hero.classList.add('has-field')
  draw(0)
  ro = new ResizeObserver(() => { measure(); draw(0) })
  ro.observe(hero)
  io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync() })
  io.observe(hero)
  document.addEventListener('visibilitychange', onVisibility)
  if (window.matchMedia('(pointer: fine)').matches) {
    hero.addEventListener('pointermove', onPointerMove)
    hero.addEventListener('pointerleave', onPointerLeave)
  }
})

onUnmounted(() => {
  stop()
  ro?.disconnect()
  io?.disconnect()
  mq?.removeEventListener('change', onMotionChange)
  document.removeEventListener('visibilitychange', onVisibility)
  hero?.removeEventListener('pointermove', onPointerMove)
  hero?.removeEventListener('pointerleave', onPointerLeave)
  hero?.classList.remove('has-field')
})
</script>

<template>
  <canvas ref="canvasRef" class="hero-field" aria-hidden="true"></canvas>
</template>
