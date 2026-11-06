<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project; headingLevel?: 2 | 3 }>()
const emit = defineEmits<{ openDialog: [src: string] }>()

const selected = ref(0)
const held = ref(false) // paused by the visitor (or by reduced motion)
const inView = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLButtonElement[]>([])
let io: IntersectionObserver | null = null

const current = computed(() => props.project.videos[selected.value])
const uid = computed(() => `rec-${props.project.id}`)

async function sync() {
  await nextTick()
  const v = videoRef.value
  if (!v) return
  if (inView.value && !held.value) v.play().catch(() => {})
  else v.pause()
}

function select(i: number, focus = false) {
  selected.value = i
  if (focus) tabRefs.value[i]?.focus()
}

function onTabKey(event: KeyboardEvent, i: number) {
  const last = props.project.videos.length - 1
  const keys: Record<string, number> = { ArrowDown: i + 1, ArrowRight: i + 1, ArrowUp: i - 1, ArrowLeft: i - 1, Home: 0, End: last }
  if (!(event.key in keys)) return
  event.preventDefault()
  const next = keys[event.key] < 0 ? last : keys[event.key] > last ? 0 : keys[event.key]
  select(next, true)
}

function togglePlay() {
  held.value = !held.value
}

watch([selected, held, inView], sync)

onMounted(() => {
  held.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(([entry]) => { inView.value = entry.isIntersecting }, { threshold: 0.35 })
  if (stageRef.value) io.observe(stageRef.value)
})

onUnmounted(() => io?.disconnect())
</script>

<template>
  <article :id="`case-${project.id}`" class="showcase">
    <div class="showcase__head">
      <div class="showcase__intro">
        <p class="kicker">Selected work</p>
        <h2 v-if="(headingLevel ?? 2) === 2" class="showcase__name">{{ project.name }}</h2>
        <h3 v-else class="showcase__name">{{ project.name }}</h3>
        <p v-if="project.tagline" class="showcase__tagline">{{ project.tagline }}</p>
        <p v-if="project.summary" class="showcase__summary">{{ project.summary }}</p>
      </div>
      <dl class="showcase__facts">
        <div v-if="project.features?.length">
          <dt>What the platform covers</dt>
          <dd>
            <ul class="showcase__features">
              <li v-for="feature in project.features" :key="feature">{{ feature }}</li>
            </ul>
          </dd>
        </div>
        <div v-if="project.stack?.length">
          <dt>Stack</dt>
          <dd>
            <ul class="tags" aria-label="Technologies">
              <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>

    <p v-if="project.context" class="showcase__context">{{ project.context }}</p>

    <div v-if="project.videos.length" class="player">
      <div
        :id="`${uid}-panel`"
        ref="stageRef"
        class="player__stage"
        role="tabpanel"
        :aria-labelledby="`${uid}-tab-${selected}`"
      >
        <button
          type="button"
          class="player__screen"
          :aria-label="`Open “${current.title}” larger, with video controls`"
          @click="emit('openDialog', current.src)"
        >
          <video
            :key="current.src"
            ref="videoRef"
            :src="current.src"
            :poster="current.poster"
            width="1280"
            height="630"
            muted
            loop
            playsinline
            preload="metadata"
          />
        </button>
        <div class="player__bar">
          <div class="player__now">
            <span class="player__title">{{ current.title }}</span>
            <span v-if="current.duration" class="mono">{{ current.duration }}</span>
          </div>
          <div class="player__controls">
            <button type="button" class="btn btn--quiet" :aria-pressed="held ? 'false' : 'true'" @click="togglePlay">
              <Icon :name="held ? 'heroicons:play-20-solid' : 'heroicons:pause-20-solid'" />
              {{ held ? 'Play' : 'Pause' }}
            </button>
            <button type="button" class="btn btn--quiet" @click="emit('openDialog', current.src)">
              <Icon name="heroicons:arrows-pointing-out-20-solid" />
              Expand
            </button>
          </div>
        </div>
      </div>

      <div class="player__list" role="tablist" aria-label="Recordings" aria-orientation="vertical">
        <button
          v-for="(video, i) in project.videos"
          :id="`${uid}-tab-${i}`"
          :key="video.src"
          ref="tabRefs"
          type="button"
          role="tab"
          class="rec"
          :class="{ 'is-active': i === selected }"
          :aria-selected="i === selected ? 'true' : 'false'"
          :aria-controls="`${uid}-panel`"
          :tabindex="i === selected ? 0 : -1"
          @click="select(i)"
          @keydown="onTabKey($event, i)"
        >
          <img class="rec__thumb" :src="video.poster" alt="" width="1280" height="630" loading="lazy" />
          <span class="rec__text">
            <span class="rec__title">{{ video.title }}</span>
            <span v-if="video.description" class="rec__desc">{{ video.description }}</span>
            <span v-if="video.duration" class="rec__time mono">{{ video.duration }}</span>
          </span>
        </button>
      </div>
    </div>
  </article>
</template>
