<script setup>
import { computed } from 'vue'

// With two languages, one link to the other: "ES" on the English page, "EN" on the Spanish one.
const { locale, locales, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const other = computed(() => locales.value.find((l) => l.code !== locale.value))
</script>

<template>
  <NuxtLink
    v-if="other"
    class="lang"
    :to="switchLocalePath(other.code)"
    :hreflang="other.language"
    :lang="other.code"
    :aria-label="t('nav.switchTo')"
    :title="t('nav.switchTo')"
  >
    <Icon name="heroicons:language-20-solid" />
    <span class="mono">{{ other.code.toUpperCase() }}</span>
  </NuxtLink>
</template>
