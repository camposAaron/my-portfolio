import en from './locales/en.json'
import es from './locales/es.json'

// Both languages are bundled with the app (a few KB) instead of fetched after load,
// so the first render already has the text and keys never flash on screen.
export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: { en, es },
}))
