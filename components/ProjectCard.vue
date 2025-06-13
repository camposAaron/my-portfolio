<script setup>
import { onMounted, ref } from "vue"

const props = defineProps({
name: String,
image: String,
description: String,
images: Array,
})
</script>
<template>
  <div class="
      w-full
      flex flex-col items-center
      rounded-xl p-1
      shadow-xl
      text-gray-200                        
      cursor-pointer                           
      relative                                 
      overflow-hidden 
      hover:bg-cyan-800 hover:shadow-2xl transition-all duration-300
      animate-fade-in-on-scroll                         
  ">
    <img
      :src="image"
      :alt="name"
      class="
        w-full                
        rounded-lg
      "
    />
    </div>
</template>
