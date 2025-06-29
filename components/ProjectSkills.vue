<script setup lang="ts">
defineProps<{
  autSkills: {
    name: string;
    icon: string;
  }[];
}>();

</script>
<template>
  <div class="flex flew-row mx-3 mt-3">
    <div class="autSkills flex flex-wrap items-center gap-2">
      <span class="text-sm font-semibold text-gray-300">Technologies:</span>
      <div v-for="skill in autSkills" :key="skill.name" class="flex items-center gap-1 text-sm text-gray-400">
        <Icon :name="skill.icon" size="2rem" />
      </div>
    </div>
  </div>
</template>