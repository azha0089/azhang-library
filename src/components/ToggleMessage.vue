<!-- src/components/ToggleMessage.vue -->
<template>
    <section class="wrap">
      <button @click="showMessage = !showMessage">Toggle Message</button>
  
      <!-- showMessage 为 true 时渲染这个段落 -->
      <p v-if="showMessage" class="message success">
        ✨ You're a Vue superstar! ✨
      </p>
  
      <!-- 否则渲染这个段落 -->
      <p v-else class="message">
        Click the button to see a message.
      </p>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  // Step 1: 定义布尔状态
  const showMessage = ref(false)
  </script>
  
  <style scoped>
  .wrap { max-width: 520px; margin: 2rem auto; font-family: sans-serif; }
  button { padding: .5rem .9rem; cursor: pointer; }
  .message { margin-top: .75rem; }
  .success { color: #2e7d32; font-weight: 600; }
  </style>
  