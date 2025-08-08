<!-- src/components/ToggleMessage.vue -->
<template>
    <section class="wrap">
      <button @click="showMessage = !showMessage">Toggle Message</button>
  
      <p v-if="showMessage" class="message success">
        ✨ You're a Vue superstar! ✨
      </p>
  
      <p v-else class="message">
        Click the button to see a message.
      </p>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const showMessage = ref(false)
  </script>
  
  <style scoped>
  .wrap { max-width: 520px; margin: 2rem auto; font-family: sans-serif; }
  button { padding: .5rem .9rem; cursor: pointer; }
  .message { margin-top: .75rem; }
  .success { color: #2e7d32; font-weight: 600; }
  </style>
  