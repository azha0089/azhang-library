<!-- src/components/AuthorsHighlight.vue -->
<template>
  <section class="wrap">
    <h2>Authors (highlight target)</h2>
    <ul>
      <li
        v-for="a in authors"
        :key="a.id"
        :class="{ highlight: isTarget(a) }"
      >
        {{ a.name }} ({{ a.birthYear }})
      </li>
    </ul>
  </section>
</template>

<script setup>
import authors from '../assets/json/authors.json'

const TARGET_NAME = 'George Orwell'
const isTarget = (a) => a.name === TARGET_NAME


</script>

<style scoped>
.wrap { max-width: 640px; margin: 2rem auto; font-family: sans-serif; }
ul { list-style: disc inside; padding: 0; }
li { margin: .25rem 0; }
.highlight {
  background: #fff3cd;
  border-left: 4px solid #ffc107;
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
