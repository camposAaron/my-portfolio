<template>
  <div :class="['skills-track', 'double-lane', { reverse }]">
    <SkillCard v-for="(skill, index) in skills" :key="index" :skill="skill" />
  </div>
</template>

<script setup>
import SkillCard from './SkillCard.vue'

defineProps({
  skills: {
    type: Array,
    required: true,
  },
  reverse: {
    type: Boolean,
    default: false,
  },
})
</script>
