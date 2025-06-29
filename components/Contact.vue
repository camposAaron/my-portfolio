<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import SectionHeader from './SectionHeader.vue'
import ContactForm from './ContactForm.vue'
import ContactInfo from './ContactInfo.vue'
import SuccessMessage from './SuccessMessage.vue'

const { $gsap: gsap, $ScrollTrigger: ScrollTrigger } = useNuxtApp()

const isSuccess = ref(false)
let entranceAnimations = []

const handleSuccess = () => {
  isSuccess.value = true
  setTimeout(() => {
    isSuccess.value = false
  }, 5000)
}

function setupContactAnimations() {
  if (!gsap || !ScrollTrigger) return

  const contactSection = document.querySelector('#contact')
  if (!contactSection) return

  // Entrance animations for contact section
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: contactSection,
      start: 'top 80%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse',
      markers: false,
    },
  })

  // Animate heading and description
  contactTl.from('#contact-heading', {
    opacity: 0,
    y: 30,
    duration: 0.8,
    ease: 'power2.out',
  })

  // Animate form elements with stagger
  contactTl.from('form > div', {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.1,
    ease: 'power2.out',
  }, '-=0.4')

  // Animate submit button
  contactTl.from('form button[type="submit"]', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out(1.7)',
  }, '-=0.2')

  // Animate contact info section
  contactTl.from('.contact-info', {
    opacity: 0,
    x: 30,
    duration: 0.8,
    ease: 'power2.out',
  }, '-=0.6')

  // Animate social links with stagger
  contactTl.from('.social-links a', {
    opacity: 0,
    y: 20,
    scale: 0.8,
    duration: 0.4,
    stagger: 0.1,
    ease: 'back.out(1.7)',
  }, '-=0.4')

  // Animate success message
  contactTl.from('.success-message', {
    opacity: 0,
    scale: 0.8,
    duration: 0.5,
    ease: 'back.out(1.7)',
  }, '-=0.2')

  entranceAnimations.push(contactTl)

  // Add hover animations for form inputs
  const inputs = document.querySelectorAll('form input, form textarea')
  inputs.forEach(input => {
    input.addEventListener('mouseenter', () => {
      gsap.to(input, {
        scale: 1.02,
        duration: 0.2,
        ease: 'power2.out',
      })
    })
    
    input.addEventListener('mouseleave', () => {
      gsap.to(input, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    })
  })

  // Add hover animations for social links
  const socialLinks = document.querySelectorAll('.social-links a')
  socialLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      gsap.to(link, {
        scale: 1.2,
        duration: 0.2,
        ease: 'back.out(1.7)',
      })
    })
    
    link.addEventListener('mouseleave', () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.2,
        ease: 'power2.out',
      })
    })
  })
}

onMounted(async () => {
  await nextTick()
  setupContactAnimations()
})

onUnmounted(() => {
  // Clean up entrance animations
  entranceAnimations.forEach(anim => {
    if (anim) {
      anim.kill()
    }
  })
  entranceAnimations = []
})
</script>

<template>
  <section
    id="contact"
    class="font-body flex flex-col w-full bg-gradient-to-b from-gray-800 to-white dark:to-gray-900 pt-20"
  >
    <div class="w-full mx-auto max-w-3xl px-10 py-20 overflox-x-hidden">
      <SectionHeader
        title="Get in Touch"
        description="Have a project in mind? Let's collaborate! I typically reply within 24 hours."
        id="contact-heading"
      />

      <div class="grid gap-8 text-left md:grid-cols-2">
        <ContactForm @success="handleSuccess" />
        <ContactInfo />
      </div>
      
      <SuccessMessage :show="isSuccess" />
    </div>
  </section>
</template>
