<script setup>
// Ordered from the layer a user sees to the layer underneath it.
// Title, layer and description live under skills.groups.<key> in i18n/locales.
const skillGroups = [  {
    key: 'frontend',
    node: 'Frontend',
    skills: ['TypeScript', 'Vue.js', 'React'],
  },  {
    key: 'backend',
    node: 'Backend',
    skills: ['Node.js', 'Express', 'NestJS', 'PostgreSQL'],
  },  {
    key: 'cloud',
    node: 'Cloud',
    skills: ['AWS', 'Docker', 'Kubernetes', 'Git'],
  },
]
</script>

<template>
  <section id="skills" class="skills" aria-labelledby="skills-heading">
    <div class="container">
      <div class="skills__top">
        <div class="skills__head" v-reveal>
          <h2 id="skills-heading">{{ $t('skills.title') }}</h2>
          <p class="lead">{{ $t('skills.lead') }}</p>
        </div>

        <!-- Frontend → Backend → Cloud. On entering the viewport the links draw in and one coral
             pulse travels the path once. Static (fully drawn) without script or with reduced motion. -->
        <figure class="flow" v-reveal :aria-label="$t('skills.flowLabel')">
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
        <li v-for="(group, i) in skillGroups" :key="group.key" v-reveal="i" class="layer skill-group" :style="{ '--depth': i }">
          <span class="layer__name mono" aria-hidden="true">{{ $t(`skills.groups.${group.key}.layer`) }}</span>
          <div class="layer__text">
            <h3>{{ $t(`skills.groups.${group.key}.title`) }}</h3>
            <p>{{ $t(`skills.groups.${group.key}.description`) }}</p>
          </div>
          <ul class="tags layer__tools" :aria-label="$t('skills.tools', { group: $t(`skills.groups.${group.key}.title`) })">
            <li v-for="skill in group.skills" :key="skill">{{ skill }}</li>
          </ul>
        </li>
      </ol>
    </div>
  </section>
</template>
