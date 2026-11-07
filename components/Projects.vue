<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { publicProjects } from '~/data/projects'

const showDialog = ref(false)
const selectedImage = ref('')
// The project crossing the upper middle of the viewport; drives the index and its underline.
const active = ref(publicProjects[0]?.id ?? '')

function openDialog(image: string) {
  selectedImage.value = image
  showDialog.value = true
}

function closeDialog() {
  selectedImage.value = ''
  showDialog.value = false
}

// Same behaviour as the header links: smooth unless reduced motion, then move focus there.
function goTo(id: string) {
  const el = document.getElementById(`case-${id}`)
  if (!el) return
  const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
  active.value = id
}

let io: IntersectionObserver | null = null
onMounted(() => {
  const visible = new Map<string, boolean>()
  io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) visible.set(e.target.id.replace('case-', ''), e.isIntersecting)
      const current = publicProjects.find((p) => visible.get(p.id))
      if (current) active.value = current.id
    },
    { rootMargin: '-30% 0px -60% 0px' },
  )
  for (const p of publicProjects) {
    const el = document.getElementById(`case-${p.id}`)
    if (el) io.observe(el)
  }
})
onUnmounted(() => io?.disconnect())
</script>

<template>
  <section id="projects" class="projects" aria-labelledby="work-title">
    <div class="container work__head" v-reveal>
      <p class="kicker">{{ $t('projects.kicker') }}</p>
      <h2 id="work-title">{{ $t('projects.title') }}</h2>
    </div>

    <ProjectNav v-if="publicProjects.length > 1" :projects="publicProjects" :active="active" @go="goTo" />

    <div class="container">
      <ProjectShowcase
        v-for="(project, i) in publicProjects"
        :key="project.id"
        :project="project"
        :index="i"
        :total="publicProjects.length"
        :prev="publicProjects[i - 1]"
        :next="publicProjects[i + 1]"
        @openDialog="openDialog"
        @go="goTo"
      />
    </div>
  </section>

  <!-- Dialog -->
  <ProjectDialog :showDialog="showDialog" :selectedImage="selectedImage" @closeDialog="closeDialog" />
</template>
