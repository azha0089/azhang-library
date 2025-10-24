<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div id="app">
    <nav class="navbar">
      <RouterLink to="/" class="nav-link">Home</RouterLink>
      <RouterLink to="/FireLogin" class="nav-link">Firebase Login</RouterLink>
      <RouterLink to="/GetBookCount" class="nav-link">Get Book Count</RouterLink>
      <!-- ✅ 新增 Weather 页面导航 -->
      <RouterLink to="/WeatherCheck" class="nav-link">Get Weather</RouterLink>
      <RouterLink to="/CurrentWeather" class="nav-link">Current Weather</RouterLink>

    </nav>

    <RouterView />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 20px;
  padding: 12px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
}

.nav-link {
  color: #007bff;
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  text-decoration: underline;
}
</style>
