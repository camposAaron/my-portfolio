<script setup>
import { ref } from 'vue'
import { publicProjects } from '~/data/projects'

const showDialog = ref(false)
const selectedImage = ref('')

function openDialog(image) {
  selectedImage.value = image
  showDialog.value = true
}

function closeDialog() {
  selectedImage.value = false
  showDialog.value = false
}
</script>
<template>
  <section id="projects" class="projects" aria-label="Selected work">
    <div class="container">
      <!-- The first public project leads the section; any later ones follow with the same layout. -->
      <ProjectShowcase
        v-for="(project, i) in publicProjects"
        :key="project.id"
        :project="project"
        :headingLevel="i === 0 ? 2 : 3"
        @openDialog="openDialog"
      />
    </div>
  </section>

  <!-- Dialog -->
  <ProjectDialog :showDialog="showDialog" :selectedImage="selectedImage" @closeDialog="closeDialog" />
</template>
