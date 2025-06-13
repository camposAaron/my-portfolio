<template>
    <button type="button" @click="$emit('toggle')" class="flex-shrink-0 p-2 rounded-full text-gray-300 dark:text-gray-400 
              hover:text-white dark:hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 
              focus:ring-white transition duration-150 ease-in-out" :aria-label="ariaLabel">
        <slot></slot>
    </button>
</template>
<script setup>
    defineProps({
        ariaLabel: {
            type: String,
            default: 'Toggle'
        }
    })
</script>