<template>
  <Transition name="fade">
    <div
      v-if="showDialog"
      class="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black p-6"
      @click.self="$emit('closeDialog')"
    >
      <div class="relative w-full max-w-4xl rounded-2xl bg-gray-900 p-6">
        <button
          class="absolute top-4 right-4 text-3xl text-white transition-colors duration-200 hover:text-red-400"
          @click="$emit('closeDialog')"
        >
          &times;
        </button>
        <video
          :src="selectedImage"
          class="w-full rounded-xl"
          autoplay
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
defineProps({
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
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 