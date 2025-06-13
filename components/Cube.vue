<template>
    <div class="cube-container" @mousedown="handleMouseDown" :style="{ cursor: isDragging ? 'grabbing' : 'grab' }">
        <div class="idle-rotator" :style="idleRotatorStyle">
            <div class="cube" :style="cubeStyle">
                <div class="face front">
                    <pre>
                        <code :class="codeClass" class="typing-effect">
                           kubectl get pods -n develop
                            - kubectl logs aut-asd1140-123xq -f
                        </code>
                    </pre>
                </div>
                <div class="face back">
                    <pre><code :class="codeClass">deployApp("prod");</code></pre>
                </div>
                <div class="face right">
                    <pre><code :class="codeClass">git commit -m "fix: update config";</code></pre>
                </div>
                <div class="face left">
                    <pre><code :class="codeClass">aws ec2 start-instance --instance-id i-12345;</code></pre>
                </div>
                <div class="face top">
                    <pre><code :class="codeClass">export CLOUD_PROVIDER="AWS";</code></pre>
                </div>
                <div class="face bottom">
                    <pre :class="preClass"><code :class="codeClass">docker-compose up --build;</code></pre>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onUnmounted, onMounted } from "vue"
import { gsap } from "gsap"
const codeClass = "typing-effect text-sm/6"
const preClass =
	"overflow-hidden whitespace-pre-wrap text-left text-sm/6 font-mono text-gray-300"
// --- Configuration ---
const DEFAULT_ROTATE_X = -20
const DEFAULT_ROTATE_Y = 30
const RETURN_TRANSITION_DURATION = "0.6s"
const DRAG_TRANSITION_DURATION = "0.05s"
const RETURN_TRANSITION_TIMING = "cubic-bezier(0.23, 1, 0.32, 1)"
const IDLE_ANIMATION_DURATION = "45s"
const sensitivity = 0.5

// --- State ---
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

// Style for the idle rotator wrapper (handles play/pause of idle animation)
const idleRotatorStyle = computed(() => ({
	animationDuration: IDLE_ANIMATION_DURATION,
	animationPlayState: isIdle.value ? "running" : "paused",
}))

// --- Event Handlers ---
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
	window.addEventListener("mousemove", handleMouseMove)
	window.addEventListener("mouseup", handleMouseUp)
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
	window.removeEventListener("mousemove", handleMouseMove)
	window.removeEventListener("mouseup", handleMouseUp)

	// Initiate return to default position (cubeStyle computed property handles transition)
	rotateX.value = DEFAULT_ROTATE_X
	rotateY.value = DEFAULT_ROTATE_Y

	// Schedule the idle animation to resume *after* the return transition should have finished
	// Convert duration string (e.g., '0.6s') to milliseconds
	const returnDurationMs = Number.parseFloat(RETURN_TRANSITION_DURATION) * 1000

	// Clear previous timeout just in case (though unlikely needed here)
	if (returnTimeoutId) clearTimeout(returnTimeoutId)

	returnTimeoutId = setTimeout(() => {
		// Only resume idle if we haven't started dragging again during the transition
		if (!isDragging.value) {
			isIdle.value = true
		}
		returnTimeoutId = null // Clear the stored ID
	}, returnDurationMs)
}

onMounted(() => {
	const faces = document.querySelectorAll(".face")
	gsap.to(faces, {
		color: "white",
		textShadow: "none",
		boxShadow: "0 0 20px rgba(255, 255, 255, 0.2)",
		border: "1px solid rgba(255, 255, 255, 0.1)",
		repeat: -1,
		duration: 6,
		yoyo: true,
	})

	gsap.from(".cube-container", {
		y: -30,
		opacity: 0.2,
		duration: 1,
		ease: "power2.out",
	})
})

// --- Cleanup ---
onUnmounted(() => {
	window.removeEventListener("mousemove", handleMouseMove)
	window.removeEventListener("mouseup", handleMouseUp)
	// Clear timeout if component unmounts during the return transition
	if (returnTimeoutId) {
		clearTimeout(returnTimeoutId)
	}
})
</script>

<style scoped>
/* --- Container and Interaction --- */
.cube-container {
    width: 300px;
    height: 300px;
    perspective: 1000px;
    opacity: 0.8;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
}

/* --- Idle Rotation --- */
@keyframes rotateIdle {
    from {
        transform: rotateY(0deg) rotateX(5deg);
        /* Gentle combined rotation */
    }

    to {
        transform: rotateY(360deg) rotateX(5deg);
        /* Loop Y axis */
    }
}

.idle-rotator {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    /* Applied via idleRotatorStyle: animation-duration, animation-play-state */
    animation-name: rotateIdle;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

/* --- Draggable Cube --- */
.cube {
    width: 100%;
    height: 100%;
    position: relative;
    /* Keep faces positioned relative to this */
    transform-style: preserve-3d;
    /* Transform and Transition handled by cubeStyle computed property */
}


/* --- Face Styles (Unchanged) --- */
.face {
    position: absolute;
    width: 300px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-family: 'Courier New', Courier, monospace;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.688);
    padding: 10px;
    box-sizing: border-box;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
    overflow: hidden;
    border: 1px solid rgba(0, 255, 255, 0.1);
    color: #00ffff;
    text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff;
}

.face pre {
    margin: 0;
    padding: 10px;
    white-space: pre-wrap;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 1.4;
    max-width: 100%;
    text-align: left;
    width: 100%;

}

/* Typing Effect (Unchanged) */
.typing-effect {
    width: 0;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    border-right: 2px solid rgba(0, 255, 255, 0.75);
    animation: typing 5s steps(40) infinite, blink 0.75s step-end infinite;

}

.cube-text {
    border-right: 2px solid rgba(0, 255, 255, 0.75);
}


@keyframes typing {
    0% {
        width: 0;
    }

    50% {
        width: 100%;
    }

    80% {
        width: 100%;
    }

    100% {
        width: 0;
    }
}

@keyframes blink {
    50% {
        border-color: transparent;
    }
}

/* Cube Faces Positioning (Unchanged) */
.front {
    transform: translateZ(150px);
}

.back {
    transform: rotateY(180deg) translateZ(150px);
}

.right {
    transform: rotateY(90deg) translateZ(150px);
}

.left {
    transform: rotateY(-90deg) translateZ(150px);
}

.top {
    transform: rotateX(90deg) translateZ(150px);
}

.bottom {
    transform: rotateX(-90deg) translateZ(150px);
}

@media (max-width: 750px) {
    .cube-container {
        margin-top: 30px;
        width: 200px;
        height: 200px;
    }

    .face {
        width: 200px;
        height: 200px;
    }

    .front {
        transform: translateZ(100px);
    }

    .back {
        transform: rotateY(180deg) translateZ(100px);
    }

    .right {
        transform: rotateY(90deg) translateZ(100px);
    }

    .left {
        transform: rotateY(-90deg) translateZ(100px);
    }

    .top {
        transform: rotateX(90deg) translateZ(100px);
    }

    .bottom {
        transform: rotateX(-90deg) translateZ(100px);
    }

}
</style>