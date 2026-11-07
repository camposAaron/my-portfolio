<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onUnmounted } from 'vue'
import type { Project } from '~/data/projects'

const props = defineProps<{ project: Project; index: number; total: number; prev?: Project; next?: Project }>()
const emit = defineEmits<{ openDialog: [src: string]; go: [id: string] }>()

const num = (i: number) => String(i + 1).padStart(2, '0')
const tr = useLocalized()

const selected = ref(0)
const held = ref(false) // paused by the visitor (or by reduced motion)
const inView = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const stageRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLButtonElement[]>([])
const listRef = ref<HTMLElement | null>(null)
// Position of the coral bar that slides to the active tab (left edge of the tab, any layout).
const indicator = ref({ x: 0, y: 0, h: 0, ready: false })
let io: IntersectionObserver | null = null
let ro: ResizeObserver | null = null

function placeIndicator() {
  const tab = tabRefs.value[selected.value]
  if (!tab) return
  indicator.value = { x: tab.offsetLeft, y: tab.offsetTop, h: tab.offsetHeight, ready: true }
}

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
watch(selected, () => nextTick(placeIndicator))

onMounted(() => {
  held.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  io = new IntersectionObserver(([entry]) => { inView.value = entry.isIntersecting }, { threshold: 0.35 })
  if (stageRef.value) io.observe(stageRef.value)
  placeIndicator()
  ro = new ResizeObserver(placeIndicator)
  if (listRef.value) ro.observe(listRef.value)
})

onUnmounted(() => {
  io?.disconnect()
  ro?.disconnect()
})
</script>

<template>
  <article :id="`case-${project.id}`" class="showcase">
    <div class="showcase__head">
      <div class="showcase__intro" v-reveal>
        <p class="kicker">{{ $t('projects.project') }} {{ num(index) }} <span class="kicker__of">/ {{ num(total - 1) }}</span></p>
        <h3 class="showcase__name">{{ project.name }}</h3>
        <p v-if="project.tagline" class="showcase__tagline">{{ tr(project.tagline) }}</p>
        <p v-if="project.summary" class="showcase__summary">{{ tr(project.summary) }}</p>
      </div>
      <dl class="showcase__facts" v-reveal="1">
        <div v-if="project.features?.length">
          <dt>{{ $t('projects.covers') }}</dt>
          <dd>
            <ul class="showcase__features">
              <li v-for="feature in project.features" :key="feature.en">{{ tr(feature) }}</li>
            </ul>
          </dd>
        </div>
        <div v-if="project.stack?.length">
          <dt>{{ $t('projects.stack') }}</dt>
          <dd>
            <ul class="tags" :aria-label="$t('projects.technologies')">
              <li v-for="tech in project.stack" :key="tech">{{ tech }}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>

    <p v-if="project.context" class="showcase__context" v-reveal>{{ tr(project.context) }}</p>

    <div v-if="project.videos.length" class="player" v-reveal>
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
          :aria-label="$t('projects.openLarger', { title: tr(current.title) })"
          @click="emit('openDialog', current.src)"
        >
          <Transition name="preview">
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
          </Transition>
        </button>
        <div class="player__bar">
          <div class="player__now">
            <span class="player__title">{{ tr(current.title) }}</span>
            <span v-if="current.duration" class="mono">{{ current.duration }}</span>
          </div>
          <div class="player__controls">
            <button type="button" class="btn btn--quiet" :aria-pressed="held ? 'false' : 'true'" @click="togglePlay">
              <Icon :name="held ? 'heroicons:play-20-solid' : 'heroicons:pause-20-solid'" />
              {{ held ? $t('common.play') : $t('common.pause') }}
            </button>
            <button type="button" class="btn btn--quiet" @click="emit('openDialog', current.src)">
              <Icon name="heroicons:arrows-pointing-out-20-solid" />
              {{ $t('common.expand') }}
            </button>
          </div>
        </div>
      </div>

      <div ref="listRef" class="player__list" role="tablist" :aria-label="$t('projects.recordingsLabel')" aria-orientation="vertical">
        <span
          class="player__indicator"
          :class="{ 'is-ready': indicator.ready }"
          :style="{ transform: `translate(${indicator.x}px, ${indicator.y}px)`, height: `${indicator.h}px` }"
          aria-hidden="true"
        ></span>
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
            <span class="rec__title">{{ tr(video.title) }}</span>
            <span v-if="video.description" class="rec__desc">{{ tr(video.description) }}</span>
            <span v-if="video.duration" class="rec__time mono">{{ video.duration }}</span>
          </span>
        </button>
      </div>
    </div>

    <nav v-if="prev || next" class="case-step" :aria-label="$t('projects.after', { name: project.name })">
      <a
        v-if="prev"
        :href="`#case-${prev.id}`"
        class="case-step__link case-step__link--prev"
        @click.prevent="emit('go', prev.id)"
      >
        <Icon name="heroicons:arrow-left-20-solid" class="case-step__arrow" />
        <span class="case-step__text">
          <span class="case-step__label mono">{{ $t('projects.previous') }} · {{ num(index - 1) }}</span>
          <span class="case-step__name">{{ prev.name }}</span>
        </span>
      </a>
      <a
        v-if="next"
        :href="`#case-${next.id}`"
        class="case-step__link case-step__link--next"
        @click.prevent="emit('go', next.id)"
      >
        <span class="case-step__text">
          <span class="case-step__label mono">{{ $t('projects.next') }} · {{ num(index + 1) }}</span>
          <span class="case-step__name">{{ next.name }}</span>
          <span v-if="next.tagline" class="case-step__tagline">{{ tr(next.tagline) }}</span>
        </span>
        <Icon name="heroicons:arrow-right-20-solid" class="case-step__arrow" />
      </a>
    </nav>
  </article>
</template>
