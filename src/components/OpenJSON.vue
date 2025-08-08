<!-- src/components/OpenJSON.vue -->
<template>
    <section>
      <h2>All Famous Works</h2>
      <ul>
        <li v-for="work in allFamousWorks" :key="work">
          {{ work }}
        </li>
      </ul>
    </section>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import authors from '../assets/json/authors.json'
  
  const allFamousWorks = computed(() =>
    authors.flatMap(author =>
      (author.famousWorks ?? []).map(work => work.title)
    ).filter(Boolean)
  )
  </script>
  
  
  
  
  <style scoped>
  .container { max-width: 640px; margin: 2rem auto; font-family: sans-serif; }
  h2 { margin: 1rem 0 .5rem; color: #2c3e50; }
  ul { list-style: disc inside; padding: 0; }
  li { margin: .25rem 0; }
  </style>
  