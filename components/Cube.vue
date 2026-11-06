<template>
  <figure ref="stageRef" class="cube-stage" data-loop>
    <div class="cube-stage__frame">
      <div class="cube-glow" aria-hidden="true"></div>
      <div
        class="cube-container"
        :class="{ 'is-dragging': isDragging }"
        role="img"
        aria-label="A cube of shell commands: kubectl, docker-compose, git and aws. Drag it to turn it."
        @pointerdown="handleMouseDown"
      >
        <div class="idle-rotator" :class="{ 'is-held': !isIdle }">
          <div class="cube" :style="cubeStyle">
            <div class="face front" aria-hidden="true">
              <pre><code><b>$</b> kubectl get pods \
    -n develop
<b>$</b> kubectl logs -f \
    aut-asd1140-123xq</code></pre>
            </div>
            <div class="face back" aria-hidden="true">
              <pre><code>deployApp("prod");</code></pre>
            </div>
            <div class="face right" aria-hidden="true">
              <pre><code><b>$</b> git commit -m \
  "fix: update config";</code></pre>
            </div>
            <div class="face left" aria-hidden="true">
              <pre><code><b>$</b> aws ec2 \
  start-instance \
  --instance-id i-12345;</code></pre>
            </div>
            <div class="face top" aria-hidden="true">
              <pre><code><b>$</b> export \
  CLOUD_PROVIDER="AWS";</code></pre>
            </div>
            <div class="face bottom" aria-hidden="true">
              <pre><code><b>$</b> docker-compose \
  up --build;</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    <figcaption>
      <span>Drag to turn it</span>
      <button type="button" class="btn btn--quiet" data-loop-toggle @click="toggle">
        {{ held ? 'Play' : 'Pause' }}
      </button>
    </figcaption>
  </figure>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue"
import { useLoop } from "~/composables/useLoop"
import { useHeroMotion } from "~/composables/useHeroMotion"

// --- Configuration ---
const DEFAULT_ROTATE_X = -20
const DEFAULT_ROTATE_Y = 30
const RETURN_TRANSITION_DURATION = "0.9s"
const DRAG_TRANSITION_DURATION = "0.05s"
const RETURN_TRANSITION_TIMING = "cubic-bezier(0.16, 1, 0.3, 1)"
const sensitivity = 0.5

// --- State ---
const stageRef = ref(null)
const { held, toggle } = useLoop(stageRef, { pauseOnHover: true })
// The cube's Pause button also holds the ASCII field behind the hero.
const heroMotion = useHeroMotion()
watch(held, (value) => { heroMotion.held.value = value }, { immediate: true })
const rotateX = ref(DEFAULT_ROTATE_X)
const rotateY = ref(DEFAULT_ROTATE_Y)
const isDragging = ref(false)
const isIdle = ref(true)
const startX = ref(0)
const startY = ref(0)
let returnTimeoutId = null

// --- Computed Styles ---
// Style for the inner cube (handles drag/return transform and transition)
const cubeStyle = computed(() => {
	const transitionDuration = isDragging.value
		? DRAG_TRANSITION_DURATION
		: RETURN_TRANSITION_DURATION
	const transitionTiming = isDragging.value
		? "linear"
		: RETURN_TRANSITION_TIMING
	return {
		transform: `rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`,
		// Apply smooth transition when returning, short/none when dragging
		transition: `transform ${transitionDuration} ${transitionTiming}`,
	}
})

// --- Event Handlers (pointer events, so touch and pen drag too) ---
const handleMouseDown = (event) => {
	// Clear any pending timeout to resume idle, in case user clicks quickly
	if (returnTimeoutId) {
		clearTimeout(returnTimeoutId)
		returnTimeoutId = null
	}

	isIdle.value = false // Pause idle animation immediately
	isDragging.value = true // Start dragging state

	startX.value = event.clientX
	startY.value = event.clientY
	event.preventDefault()
	window.addEventListener("pointermove", handleMouseMove)
	window.addEventListener("pointerup", handleMouseUp)
	window.addEventListener("pointercancel", handleMouseUp)
}

const handleMouseMove = (event) => {
	// This only runs while dragging due to listener attachment/detachment
	const dx = event.clientX - startX.value
	const dy = event.clientY - startY.value

	rotateY.value += dx * sensitivity
	rotateX.value -= dy * sensitivity

	startX.value = event.clientX
	startY.value = event.clientY
}

const handleMouseUp = () => {
	if (!isDragging.value) return // Prevent potential multiple triggers

	isDragging.value = false // End dragging state
	window.removeEventListener("pointermove", handleMouseMove)
	window.removeEventListener("pointerup", handleMouseUp)
	window.removeEventListener("pointercancel", handleMouseUp)

	// Initiate return to default position (cubeStyle computed property handles transition)
	rotateX.value = DEFAULT_ROTATE_X
	rotateY.value = DEFAULT_ROTATE_Y

	// Schedule the idle animation to resume *after* the return transition should have finished
	const returnDurationMs = Number.parseFloat(RETURN_TRANSITION_DURATION) * 1000

	if (returnTimeoutId) clearTimeout(returnTimeoutId)

	returnTimeoutId = setTimeout(() => {
		// Only resume idle if we haven't started dragging again during the transition
		if (!isDragging.value) {
			isIdle.value = true
		}
		returnTimeoutId = null
	}, returnDurationMs)
}

// --- Cleanup ---
onUnmounted(() => {
	window.removeEventListener("pointermove", handleMouseMove)
	window.removeEventListener("pointerup", handleMouseUp)
	window.removeEventListener("pointercancel", handleMouseUp)
	if (returnTimeoutId) {
		clearTimeout(returnTimeoutId)
	}
})
</script>
