<script setup>
defineProps({
    href: String,
    text: String,
    customClass: {
        type: String,
        default: ''
    }
})
</script>                   
<template>
    <a :key="href" :href="href" :class="customClass" class="flex flex-row  items-center px-3 
    py-2 rounded-md font-medium text-gray-300 dark:text-gray-300 
    hover:text-cyan-400 hover:cursor-pointerdark:hover:text-white transition duration-150 ease-in-out">
        <slot name="icon"></slot>
        <span class="ml-1">{{ text }}</span>
    </a>    
</template>