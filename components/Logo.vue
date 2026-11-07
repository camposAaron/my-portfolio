<script setup>
const localePath = useLocalePath()

defineProps({
  customClass: String,
  /** 'md' for the header and menu, 'lg' for the footer. */
  size: { type: String, default: 'md' },
})
</script>
<template>
  <div :class="customClass">
    <!-- Trimmed copies of public/branding/aarondev-logo-transparent.png (2172x724). -->
    <NuxtLink :to="localePath('/')" class="wordmark" :class="`wordmark--${size}`" :aria-label="$t('nav.logo')">
      <img
        :src="size === 'lg' ? '/branding/aarondev-logo-144.png' : '/branding/aarondev-logo-96.png'"
        alt="AaronDEV"
        width="400"
        height="96"
      />
    </NuxtLink>
  </div>
</template>
