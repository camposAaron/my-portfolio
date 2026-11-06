<script setup>
// Ordered from the layer a user sees to the layer underneath it.
const skillGroups = [
  {
    title: 'Frontend development',
    layer: 'Interface',
    node: 'Frontend',
    description: 'Web interfaces for forms, dashboards, and employee workflows.',
    skills: ['TypeScript', 'Vue.js', 'React'],
  },
  {
    title: 'Backend development',
    layer: 'Services',
    node: 'Backend',
    description: 'Services and data handling behind application features and business processes.',
    skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL'],
  },
  {
    title: 'Cloud & delivery',
    layer: 'Infrastructure',
    node: 'Cloud',
    description: 'Cloud and container technologies used alongside application development.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Git'],
  },
]
</script>

<template>
  <section id="skills" class="skills" aria-labelledby="skills-heading">
    <div class="container">
      <div class="skills__top">
        <div class="skills__head" v-reveal>
          <h2 id="skills-heading">From interface to infrastructure</h2>
          <p class="lead">My experience connects the application layer with the services and infrastructure behind it.</p>
        </div>

        <!-- Frontend → Backend → Cloud. On entering the viewport the links draw in and one coral
             pulse travels the path once. Static (fully drawn) without script or with reduced motion. -->
        <figure class="flow" v-reveal aria-label="How the layers connect: Frontend to Backend to Cloud">
          <template v-for="(group, i) in skillGroups" :key="group.node">
            <div class="flow__node" :style="{ '--n': i }">
              <span class="flow__name">{{ group.node }}</span>
              <span class="flow__tools mono">{{ group.skills.slice(0, 3).join(', ') }}</span>
            </div>
            <span v-if="i < skillGroups.length - 1" class="flow__link" :style="{ '--n': i }" aria-hidden="true">
              <span class="flow__line"></span>
              <span class="flow__pulse"></span>
            </span>
          </template>
        </figure>
      </div>

      <ol class="layers">
        <li v-for="(group, i) in skillGroups" :key="group.title" v-reveal="i" class="layer skill-group" :style="{ '--depth': i }">
          <span class="layer__name mono" aria-hidden="true">{{ group.layer }}</span>
          <div class="layer__text">
            <h3>{{ group.title }}</h3>
            <p>{{ group.description }}</p>
          </div>
          <ul class="tags layer__tools" :aria-label="`${group.title} tools`">
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
