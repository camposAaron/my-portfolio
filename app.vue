<script setup>
// <html lang>, hreflang alternates and og:locale for the current language, plus the translated description.
const { t } = useI18n()
const localeHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: { lang: localeHead.value.htmlAttrs?.lang },
  link: [...(localeHead.value.link || [])],
  meta: [{ name: 'description', content: t('meta.description') }, ...(localeHead.value.meta || [])],
}))
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
