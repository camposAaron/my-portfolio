<template>
  <div class="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-102"
      @click="handleClick">
      <video 
          :src="image" 
          :alt="name" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
          ref="videoRef"
          loop 
          muted 
          playsinline
          preload="auto"
          @loadeddata="onVideoLoaded"
      />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue"

const props = defineProps({
name: String,
image: String,
})

const emit = defineEmits(["openDialog"])
const videoRef = ref(null)
const isLoaded = ref(false)

function handleClick() {
emit("openDialog", props.image)
}

function onVideoLoaded() {
isLoaded.value = true
}

function play() {
if (videoRef.value && isLoaded.value) {
  videoRef.value.play().catch((error) => {
    console.log("Error playing video:", error)
  })
}
}

function pause() {
if (videoRef.value) {
  videoRef.value.pause()
}
}

onMounted(() => {
if (videoRef.value) {
  videoRef.value.load()
}
})

onUnmounted(() => {
if (videoRef.value) {
  videoRef.value.pause()
}
})

// Expose video ref and control methods to parent
defineExpose({
videoRef,
play,
pause,
})
</script>

<style scoped>
video {
  aspect-ratio: 16/9;
  object-fit: cover;
}
</style>