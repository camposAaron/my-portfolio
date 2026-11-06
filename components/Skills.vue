<script setup>
import { onMounted, onUnmounted, nextTick } from 'vue'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

let animation = null

const skillGroups = [
  {
    title: 'Frontend',
    skills: [
      { name: 'TypeScript', icon: 'skill-icons:typescript' },
      { name: 'Vue.js', icon: 'skill-icons:vuejs-dark' },
      { name: 'React', icon: 'skill-icons:react-dark' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: 'skill-icons:nodejs-dark' },
      { name: 'NestJS', icon: 'skill-icons:nestjs-dark' },
      { name: 'Express', icon: 'skill-icons:expressjs-dark' },
      { name: 'PostgreSQL', icon: 'skill-icons:postgresql-dark' },
    ],
  },
  {
    title: 'Cloud & DevOps',
    skills: [
      { name: 'AWS', icon: 'skill-icons:aws-dark' },
      { name: 'Docker', icon: 'skill-icons:docker' },
      { name: 'Kubernetes', icon: 'skill-icons:kubernetes' },
      { name: 'Git', icon: 'skill-icons:git' },
    ],
  },
]

onMounted(async () => {
  await nextTick()
  if (!gsap || !ScrollTrigger) return

  animation = gsap.from('.skill-group', {
    opacity: 0,
    y: 40,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 70%',
      toggleActions: 'play none none reverse',
    },
  })
})

onUnmounted(() => {
  animation?.scrollTrigger?.kill()
  animation?.kill()
  animation = null
})
</script>

<template>
  <section
    id="skills"
    class="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 px-6 py-24 text-gray-300 md:py-32"
  >
    <div class="side-shadow left" aria-hidden="true"></div>
    <div class="side-shadow right" aria-hidden="true"></div>

    <div class="relative mx-auto max-w-5xl text-center">
      <h2
        class="font-heading bg-gradient-to-tr from-[#fcfdff] from-33% to-[#818dc0] to-100% bg-clip-text text-3xl font-bold text-transparent md:text-4xl"
      >
        Skills & Tools
      </h2>
      <p class="font-body mx-auto mt-3 max-w-2xl text-lg md:text-xl">
        The technologies I use to build and ship products end to end.
      </p>

      <div class="mt-14 grid gap-6 text-left md:mt-20 md:grid-cols-3">
        <div
          v-for="group in skillGroups"
          :key="group.title"
          class="skill-group rounded-2xl border border-white/10 bg-gray-900/60 p-6 backdrop-blur-sm"
        >
          <h3 class="font-heading mb-5 text-sm font-semibold tracking-widest text-sky-400 uppercase">
            {{ group.title }}
          </h3>
          <ul class="grid grid-cols-2 gap-3">
            <li v-for="skill in group.skills" :key="skill.name" class="skill-chip">
              <Icon :name="skill.icon" size="1.75rem" class="shrink-0" />
              <span class="font-heading truncate text-sm font-medium text-gray-200">
                {{ skill.name }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skill-chip {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(145deg, #1f2937, #111827);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;
}

.skill-chip:hover {
  transform: translateY(-3px);
  border-color: rgba(56, 189, 248, 0.6);
  box-shadow: 0 8px 24px -8px rgba(56, 189, 248, 0.35);
}

.side-shadow {
  position: absolute;
  top: 10%;
  bottom: 10%;
  width: 260px;
  pointer-events: none;
  border-radius: 9999px;
  filter: blur(80px);
  opacity: 0.35;
}

.side-shadow.left {
  left: -150px;
  background: radial-gradient(circle at left, #38bdf8 0%, transparent 80%);
}

.side-shadow.right {
  right: -150px;
  background: radial-gradient(circle at right, #818dc0 0%, transparent 80%);
}

@media (prefers-reduced-motion: reduce) {
  .skill-chip {
    transition: none;
  }
  .skill-chip:hover {
    transform: none;
  }
}
</style>
