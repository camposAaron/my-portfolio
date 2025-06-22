<template>
  <section
    id="skills"
    class="overflow-x-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 pt-30 pb-40 text-gray-300"
  >
    <div id="skill-container" class="relative text-center">
      <h2
        class="font-heading animate-fade-in mt-5 bg-gradient-to-tr from-[#fcfdff] from-33% to-[#818dc0] to-100% bg-clip-text px-6 text-3xl font-bold text-transparent md:text-4xl"
      >
        Skills & Tools
      </h2>
      <p class="font-body animate-fade-in mx-auto mt-3 max-w-2xl px-6 text-lg md:text-xl">
        Some of the technologies and tools I work with regularly.
      </p>
      <div class="skills-container mt-16 md:mt-24">
        <div class="skills-track">
          <div
            v-for="(skill, index) in isMobile ? repeatedSkills : skills"
            :key="index"
            class="skill-card group"
          >
            <div class="skill-card-face">
              <Icon :name="skill.icon" size="20rem" />
              <span class="font-heading mt-3 text-sm font-medium text-gray-300 md:text-base">
                {{ skill.name }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const isMobile = ref(false)
let scrollTrigger = null
let animation = null

onMounted(async () => {
  isMobile.value = window.innerWidth < 768

  // Add resize listener to update isMobile when window size changes
  const handleResize = () => {
    isMobile.value = window.innerWidth < 768
  }
  
  window.addEventListener('resize', handleResize)

  await nextTick()
  
  if (gsap && ScrollTrigger) {
    const skillsSection = document.querySelector('#skills')
    
    if (skillsSection) {
      animation = gsap.from('#skill-container', {
        opacity: 0,
        y: 50,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: skillsSection,
          start: '20% 80%',
          end: 'bottom 30%',
          toggleActions: 'play none none reverse',
          markers: true,
        },
      })
      
      // Store ScrollTrigger instance for cleanup
      scrollTrigger = animation.scrollTrigger
    }
  }
})

onUnmounted(() => {
  // Clean up ScrollTrigger when component is unmounted
  if (scrollTrigger) {
    scrollTrigger.kill()
    scrollTrigger = null
  }
  if (animation) {
    animation.kill()
    animation = null
  }
})


const skills = ref([
  { name: 'JavaScript', icon: 'skill-icons:javascript' },
  { name: 'Vue.js', icon: 'skill-icons:vuejs-dark' },
  { name: 'Angular', icon: 'skill-icons:angular-dark' },
  { name: 'React', icon: 'skill-icons:react-dark' },
  { name: 'NestJS', icon: 'skill-icons:nestjs-dark' },
  { name: 'Node.js', icon: 'skill-icons:nodejs-dark' },
  { name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-dark' },
  { name: 'Git', icon: 'skill-icons:git' },
  { name: 'Docker', icon: 'skill-icons:docker' },
  { name: 'Kubernetes', icon: 'skill-icons:kubernetes' },
  { name: 'TypeScript', icon: 'skill-icons:typescript' },
  { name: 'PostgreSQL', icon: 'skill-icons:postgresql-dark' },
  { name: 'AWS', icon: 'skill-icons:aws-dark' },
  { name: 'Python', icon: 'skill-icons:python-dark' },
  { name: 'Supabase', icon: 'skill-icons:supabase-dark' },

])

const repeatedSkills = computed(() => [...skills.value, ...skills.value])
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out forwards;
}

/* --- Mobile First: Carousel Styles (Default) --- */

@keyframes carousel-scroll {
  from {
    transform: translateX(0);
  }

  to {
    /* Moves the track left by the width of the original set of items */
    transform: translateX(-50%);
  }
}

.skills-container {
  width: 100%;
  /* Creates a fade-out effect on the left and right edges of the carousel */
  -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
  mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
}

.skills-track {
  display: flex;
  gap: 1.5rem;
  padding: 0 1rem;
  width: max-content;
  animation: carousel-scroll 40s linear infinite;
}

.skill-card {
  flex-shrink: 0;
  /* Prevents cards from shrinking */
}

.skill-card-face {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 140px;
  /* Fixed width for carousel items */
  height: 140px;
  /* Fixed height for carousel items */
  padding: 1rem;
  border-radius: 0.75rem;
  background: linear-gradient(145deg, #374151, #1f2937);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.skill-card:hover .skill-card-face {
  transform: scale(1.05);
  background: linear-gradient(to right, #38bdf8, #3b82f6);
}

.filter-glow {
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.9));
}

/* --- Desktop Styles: 3D Isometric Grid (Applied on screens 768px and wider) --- */

@media (min-width: 768px) {
  /* Remove mobile-specific container styles */
  .skills-container {
    -webkit-mask-image: none;
    mask-image: none;
    perspective: 1200px;
    /* Re-enable 3D perspective */
  }

  /* Stop the animation and switch to a grid layout */
  .skills-track {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 3rem;
    margin: 0px auto;
    padding-left: 8em;
    animation: none;
    /* Disable carousel animation */
    transform-style: preserve-3d;
    transform: rotateX(45deg) rotateZ(315deg);
    /* Isometric rotation */
  }

  @media (min-width: 1024px) {
    .skills-track {
      width: 35%;
      grid-template-columns: repeat(5, 1fr);
      margin: 0px auto;
      padding: 0;
    }
  }

  /* Re-enable 3D card styles */
  .skill-card {
    position: relative;
    transform-style: preserve-3d;
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .skill-card-face {
    transform: translateZ(4px);
  }

  .skill-card:hover .skill-card-face {
    /* Override mobile hover effect */
    transform: translateZ(4px);
    /* Keep face in place */
    background: linear-gradient(to right, #38bdf8, #3b82f6);
  }

  /* Add back the card "thickness" pseudo-element for the 3D effect */
  .skill-card::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 0.75rem;
    background: #111827;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transform: translateZ(0);
  }

  /* Re-enable the 3D lift on hover */
  .skill-card:hover {
    transform: translateZ(25px);
    cursor: pointer;
  }
}
</style>
