<template>
  <div class="auth-container">
    <h1>🔥 Firebase Authentication</h1>

    <!-- 注册 -->
    <div class="auth-section">
      <h2>Register</h2>
      <input v-model="registerEmail" type="email" placeholder="Email" />
      <input v-model="registerPassword" type="password" placeholder="Password" />
      <button @click="register">Register</button>
    </div>

    <!-- 登录 -->
    <div class="auth-section">
      <h2>Login</h2>
      <input v-model="loginEmail" type="email" placeholder="Email" />
      <input v-model="loginPassword" type="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>

    <!-- 当前用户 -->
    <div class="auth-section" v-if="currentUser">
      <h2>Current User</h2>
      <p>Email: {{ currentUser.email }}</p>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import app from "../firebaseConfig"  // ✅ 导入 Firebase 初始化配置
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth"

// ✅ 传入 app，确保使用正确的 Firebase 实例
const auth = getAuth(app)

const registerEmail = ref("")
const registerPassword = ref("")
const loginEmail = ref("")
const loginPassword = ref("")
const currentUser = ref(null)

const register = async () => {
  try {
    await createUserWithEmailAndPassword(auth, registerEmail.value, registerPassword.value)
    alert("✅ Registered successfully!")
  } catch (err) {
    alert("❌ " + err.message)
  }
}

const login = async () => {
  try {
    await signInWithEmailAndPassword(auth, loginEmail.value, loginPassword.value)
    alert("✅ Logged in successfully!")
  } catch (err) {
    alert("❌ " + err.message)
  }
}

const logout = async () => {
  await signOut(auth)
  alert("👋 Logged out")
}

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    currentUser.value = user
  })
})
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 12px;
  text-align: center;
  background: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.auth-section {
  margin-top: 20px;
}

input {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 8px 0;
  border: 1px solid #ccc;
  border-radius: 8px;
}

button {
  background: #42b983;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 8px;
}

button:hover {
  background: #369870;
}
</style>
