<template>
  <div class="container mt-5 text-center">
    <h1>📗 Book Counter</h1>
    <button @click="getBookCount" class="btn">Get Book Count</button>

    <div v-if="count !== null" class="result">
      <p>Total number of books: {{ count }}</p>
    </div>

    <div v-else-if="error" class="error">
      <p>Error: {{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios"
import { ref } from "vue"

const count = ref(null)
const error = ref(null)

const getBookCount = async () => {
  try {
    const response = await axios.get("https://us-central1-week7-aocheng.cloudfunctions.net/countBooks")
    count.value = response.data.count
  } catch (err) {
    error.value = "Failed to fetch book count"
  }
}
</script>

<style scoped>
.container {
  text-align: center;
  margin-top: 50px;
}
.btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
}
.btn:hover {
  background-color: #0056b3;
}
.result {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
.error {
  margin-top: 20px;
  color: red;
}
</style>
