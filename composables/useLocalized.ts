import type { Localized } from '~/data/projects'

// Picks the current language's version of a Localized text, falling back to English.
export function useLocalized() {
  const { locale } = useI18n()
  return (text?: Localized) => (text ? (text[locale.value as keyof Localized] ?? text.en) : '')
}
