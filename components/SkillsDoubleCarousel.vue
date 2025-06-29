<template>
  <div class="skills-container mt-16 md:mt-24">
    <SkillsLane :skills="topLaneSkillsLoop" />
    <SkillsLane :skills="bottomLaneSkillsLoop" reverse />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import SkillsLane from './SkillsLane.vue'

defineProps({
  skills: {
    type: Array,
    required: true
  }
})

const topLaneSkills = computed(() => props.skills.filter((_, i) => i % 2 === 0))
const bottomLaneSkills = computed(() => props.skills.filter((_, i) => i % 2 === 1))
const topLaneSkillsLoop = computed(() => [...topLaneSkills.value, ...topLaneSkills.value])
const bottomLaneSkillsLoop = computed(() => [...bottomLaneSkills.value, ...bottomLaneSkills.value])
</script> 