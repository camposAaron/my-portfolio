<script setup lang="ts">
import { ref, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Project } from '~/data/projects'

// The project index. It sits under the section heading, then sticks below the site
// bar as a second row while the visitor is inside Selected work.
const props = defineProps<{ projects: Project[]; active: string }>()
const emit = defineEmits<{ go: [id: string] }>()

const sentinel = ref<HTMLElement | null>(null)
const listRef = ref<HTMLElement | null>(null)
const linkRefs = ref<HTMLAnchorElement[]>([])
const stuck = ref(false)
// The coral underline that slides to the current project.
const indicator = ref({ x: 0, w: 0, ready: false })
let ro: ResizeObserver | null = null
let barH = 68
let ticking = false

// Stuck = the spot where the index sits at rest has scrolled under the bar. Measured on
// scroll (once per frame) rather than with an IntersectionObserver, which misses jumps
// straight past the sentinel, e.g. reloading halfway down the page.
function updateStuck() {
  ticking = false
  const el = sentinel.value
  if (el) stuck.value = el.getBoundingClientRect().top < barH
}
function onScroll() {
  if (!ticking) {
    ticking = true
    requestAnimationFrame(updateStuck)
  }
}

const num = (i: number) => String(i + 1).padStart(2, '0')

function placeIndicator() {
  const i = props.projects.findIndex((p) => p.id === props.active)
  const link = linkRefs.value[i]
  if (!link) {
    indicator.value = { ...indicator.value, ready: false }
    return
  }
  indicator.value = { x: link.offsetLeft, w: link.offsetWidth, ready: true }
  // On narrow screens the list scrolls sideways: keep the current project in view.
  const list = listRef.value
  if (list && list.scrollWidth > list.clientWidth) {
    list.scrollTo({ left: link.offsetLeft - 16, behavior: 'smooth' })
  }
}

watch(() => props.active, () => nextTick(placeIndicator))

onMounted(() => {
  barH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--bar-h')) || 68
  updateStuck()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  placeIndicator()
  ro = new ResizeObserver(placeIndicator)
  if (listRef.value) ro.observe(listRef.value)
})

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
  ro?.disconnect()
})
</script>

<template>
  <div ref="sentinel" class="work-nav__sentinel" aria-hidden="true"></div>
  <nav class="work-nav" :class="{ 'is-stuck': stuck }" :aria-label="$t('projects.navLabel')">
    <div class="container work-nav__in">
      <ol ref="listRef" class="work-nav__list">
        <li v-for="(project, i) in projects" :key="project.id">
          <a
            ref="linkRefs"
            :href="`#case-${project.id}`"
            class="work-nav__link"
            :class="{ 'is-active': project.id === active }"
            :aria-current="project.id === active ? 'true' : undefined"
            @click.prevent="emit('go', project.id)"
          >
            <span class="work-nav__num mono">{{ num(i) }}</span>
            <span class="work-nav__name">{{ project.name }}</span>
            <span class="work-nav__meta mono">{{ $t('projects.recordings', project.videos.length) }}</span>
          </a>
        </li>
        <!-- Inside the list so it scrolls with the links on narrow screens. -->
        <li
          class="work-nav__indicator"
          :class="{ 'is-ready': indicator.ready }"
          :style="{ transform: `translateX(${indicator.x}px)`, width: `${indicator.w}px` }"
          aria-hidden="true"
        ></li>
      </ol>
    </div>
  </nav>
</template>
