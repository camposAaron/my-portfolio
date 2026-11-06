<script setup>
// Ordered from the layer a user sees to the layer underneath it.
const skillGroups = [
  {
    title: 'Frontend development',
    layer: 'Interface',
    description: 'Web interfaces for forms, dashboards, and employee workflows.',
    skills: ['TypeScript', 'Vue.js', 'React'],
  },
  {
    title: 'Backend development',
    layer: 'Services',
    description: 'Services and data handling behind application features and business processes.',
    skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL'],
  },
  {
    title: 'Cloud & delivery',
    layer: 'Infrastructure',
    description: 'Cloud and container technologies used alongside application development.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Git'],
  },
]
</script>

<template>
  <section id="skills" class="skills" aria-labelledby="skills-heading">
    <div class="container skills__grid">
      <div class="skills__head">
        <h2 id="skills-heading">From interface to infrastructure</h2>
        <p class="lead">My experience connects the application layer with the services and infrastructure behind it.</p>
      </div>

      <ol class="layers">
        <li v-for="(group, i) in skillGroups" :key="group.title" class="layer skill-group" :style="{ '--depth': i }">
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
