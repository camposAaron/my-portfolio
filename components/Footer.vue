<template>
  <footer class="font-heading relative overflow-hidden h-30 bg-gray-900">
    <div class="perspective-container">
      <div class="road-grid"></div>
      <div class="road-glow"></div>
    </div>

    <!-- Footer Content -->
    <div class="absolute bottom-8 w-full text-center z-10">
      <div class="flex flex-row w-full justify-center  font-bold text-cyan-300 glow">
        <Logo class="flex-shrink-0"/> 
        <span>{{ new Date().getFullYear() }}</span>
      </div>
    </div>
  </footer>
</template>
<style scoped>
.perspective-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform-origin: bottom;
  transform-style: preserve-3d;
  perspective: 200px;
}

.road-grid {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-repeat: repeat;
  background-image:
    linear-gradient(to right,
      rgba(255, 40, 255, 0.3) 1px,
      transparent 1px),
    linear-gradient(to bottom,
      rgba(255, 40, 255, 0.3) 1px,
      transparent 1px);
  background-size: 60px 120px;
  animation: roadMove 1.5s linear infinite;
  transform: translateZ(100px) rotateX(70deg);
}

@keyframes roadMove {
  from {
    background-position: 0 -120px;
  }

  to {
    background-position: 0 0;
  }
}

.road-grid::before,
.road-grid::after {
  position: absolute;
  top: 0;
  height: 100%;
  width: 4rem;
  /* w-16 = 4rem */
  content: '';
}

.road-grid::before {
  left: 0;
  background-image: linear-gradient(to right,
      rgba(255, 0, 150, 0.8),
      transparent);
}

.road-grid::after {
  right: 0;
  background-image: linear-gradient(to left,
      rgba(0, 204, 255, 0.8),
      transparent);
}

.center-line {
  position: absolute;
  left: 50%;
  top: 0;
  height: 100%;
  width: 0.5rem;
  /* w-2 = 0.5rem */
  transform: translateX(-50%);
  background: repeating-linear-gradient(to bottom,
      transparent 0,
      transparent 20px,
      #ff00ff 20px,
      #ff00ff 40px);
  animation: lineMove 1s linear infinite;
}

@keyframes lineMove {
  from {
    transform: translate(-50%, -40px);
  }

  to {
    transform: translate(-50%, 0);
  }
}

.road-glow {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: radial-gradient(circle at center,
      rgba(255, 100, 255, 0.2) 0%,
      transparent 60%);
  filter: blur(30px);
}

.glow {
  text-shadow: 0 0 15px rgba(0, 255, 255, 0.7),
    0 0 25px rgba(0, 255, 255, 0.5),
    0 0 35px rgba(0, 255, 255, 0.3);
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {

  0%,
  100% {
    opacity: 0.8;
  }

  50% {
    opacity: 1;
  }
}
</style>