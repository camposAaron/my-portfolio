// Playwright videos don't show the mouse. This init script draws a cursor that
// follows real mouse events, plus a ripple on every click, inside each page.
export const cursorScript = () => {
  if (window.top !== window) return
  const install = () => {
    if (document.getElementById('__rec-cursor')) return
    const style = document.createElement('style')
    style.textContent = `
      #__rec-cursor{position:fixed;left:0;top:0;width:26px;height:26px;z-index:2147483647;
        pointer-events:none;opacity:0;transition:opacity .2s,scale .12s;transform-origin:3px 2px;
        filter:drop-shadow(0 1px 2px rgba(0,0,0,.35))}
      #__rec-cursor.down{scale:.85}
      .__rec-ripple{position:fixed;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;
        z-index:2147483646;pointer-events:none;border:2px solid rgba(59,130,246,.9);
        background:rgba(59,130,246,.18);animation:__rec-ripple .5s ease-out forwards}
      @keyframes __rec-ripple{from{transform:scale(.3);opacity:1}to{transform:scale(1.4);opacity:0}}`
    document.documentElement.appendChild(style)

    const cursor = document.createElement('div')
    cursor.id = '__rec-cursor'
    cursor.innerHTML =
      '<svg viewBox="0 0 26 26" width="26" height="26"><path d="M3 2 L3 20 L8 15.5 L11.5 23 L14.5 21.7 L11 14.3 L17.5 14.3 Z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>'
    document.documentElement.appendChild(cursor)

    const pos = window.__recCursorPos
    if (pos) {
      cursor.style.translate = `${pos.x - 3}px ${pos.y - 2}px`
      cursor.style.opacity = '1'
    }
    addEventListener('mousemove', (e) => {
      window.__recCursorPos = { x: e.clientX, y: e.clientY }
      cursor.style.translate = `${e.clientX - 3}px ${e.clientY - 2}px`
      cursor.style.opacity = '1'
    }, true)
    addEventListener('mousedown', (e) => {
      cursor.classList.add('down')
      const ripple = document.createElement('div')
      ripple.className = '__rec-ripple'
      ripple.style.left = `${e.clientX}px`
      ripple.style.top = `${e.clientY}px`
      document.documentElement.appendChild(ripple)
      setTimeout(() => ripple.remove(), 600)
    }, true)
    addEventListener('mouseup', () => cursor.classList.remove('down'), true)
  }
  if (document.documentElement) install()
  else document.addEventListener('DOMContentLoaded', install)
}
