<template>
  <Transition name="fade">
    <div
      v-if="showDialog"
      class="dialog"
      role="dialog"
      aria-modal="true"
      :aria-label="$t('projects.dialogLabel')"
      @click.self="$emit('closeDialog')"
      @keydown.esc="$emit('closeDialog')"
    >
      <div class="dialog__box">
        <button ref="closeRef" type="button" class="btn btn--quiet" @click="$emit('closeDialog')">
          <Icon name="heroicons:x-mark-20-solid" />
          {{ $t('common.close') }}
        </button>
        <video
          :src="selectedImage"
          :autoplay="!reduceMotion"
          loop
          muted
          playsinline
          controls
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

const props = defineProps({
  showDialog: {
    type: Boolean,
    default: false
  },
  selectedImage: {
    type: String,
    default: ''
  }
})

defineEmits(['closeDialog'])

// Move focus into the dialog when it opens and back to where it came from when it closes.
const closeRef = ref(null)
const reduceMotion = ref(false)
let returnTo = null
watch(() => props.showDialog, async (open) => {
  if (open) {
    returnTo = document.activeElement
    reduceMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    await nextTick()
    closeRef.value?.focus()
  } else if (returnTo instanceof HTMLElement) {
    returnTo.focus()
    returnTo = null
  }
})
</script>
