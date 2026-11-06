<template>
    <button type="button" class="icon-btn" @click="$emit('toggle')" :aria-label="ariaLabel">
        <slot></slot>
    </button>
</template>
<script setup>
    defineEmits(['toggle'])
    defineProps({
        ariaLabel: {
            type: String,
            default: 'Toggle'
        }
    })
</script>
