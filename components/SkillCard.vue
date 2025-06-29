<template>
  <div class="skill-card group">
    <div class="skill-card-face">
      <Icon :name="skill.icon" size="20rem" />
      <span class="font-heading mt-3 text-sm font-medium text-gray-300 md:text-base">
        {{ skill.name }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  skill: {
    type: Object,
    required: true
  }
})
</script> 