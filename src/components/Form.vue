<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-md-8 col-lg-6">
        <h1 class="text-center mb-4">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
            />
            <div v-if="errors.username" class="text-danger">
              {{ errors.username }}
            </div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <div v-if="errors.password" class="text-danger">
              {{ errors.password }}
            </div>
          </div>

          <!-- Australian Resident (Radio) -->
          <div class="mb-3">
            <label class="form-label">Australian Resident?</label>
            <div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="residentYes"
                  value="yes"
                  v-model="formData.resident"
                  @change="() => validateResident(true)"
                />
                <label class="form-check-label" for="residentYes">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  id="residentNo"
                  value="no"
                  v-model="formData.resident"
                  @change="() => validateResident(true)"
                />
                <label class="form-check-label" for="residentNo">No</label>
              </div>
            </div>
            <div v-if="errors.resident" class="text-danger">
              {{ errors.resident }}
            </div>
          </div>

          <!-- Gender (Dropdown) -->
          <div class="mb-3">
            <label for="gender" class="form-label">Gender</label>
            <select
              class="form-select"
              id="gender"
              v-model="formData.gender"
              @blur="() => validateGender(true)"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <div v-if="errors.gender" class="text-danger">
              {{ errors.gender }}
            </div>
          </div>

          <!-- Reason -->
          <div class="mb-3">
            <label for="reason" class="form-label">Reason</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">
              {{ errors.reason }}
            </div>
          </div>

          <!-- Buttons -->
          <div class="d-flex justify-content-center mt-4">
            <button type="submit" class="btn btn-primary me-3">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>

        <!-- Table of submitted data -->
        <div v-if="submittedData.length > 0" class="mt-5">
          <h2 class="text-center">Submitted Data</h2>
          <div class="table-responsive">
            <table class="table table-bordered table-striped text-center">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Password</th>
                  <th>Resident</th>
                  <th>Gender</th>
                  <th>Reason</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in submittedData" :key="index">
                  <td>{{ item.username }}</td>
                  <td>{{ item.password }}</td>
                  <td>{{ item.resident }}</td>
                  <td>{{ item.gender }}</td>
                  <td>{{ item.reason }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// 表单数据
const formData = ref({
  username: '',
  password: '',
  resident: '',
  gender: '',
  reason: ''
})

// 错误提示
const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null
})

// 已提交的数据
const submittedData = ref([])

// 验证函数
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Username must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (
    password.length < minLength ||
    !hasUppercase ||
    !hasLowercase ||
    !hasNumber ||
    !hasSpecial
  ) {
    if (blur) {
      errors.value.password =
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
    }
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (!formData.value.resident) {
    if (blur) errors.value.resident = 'Please select if you are a resident'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select your gender'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.trim().length < 10) {
    if (blur) errors.value.reason = 'Reason must be at least 10 characters'
  } else {
    errors.value.reason = null
  }
}

// 清空表单
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    resident: '',
    gender: '',
    reason: ''
  }
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null
  }
}

// 提交表单
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  const allValid = Object.values(errors.value).every((error) => error === null)

  if (allValid) {
    submittedData.value.push({ ...formData.value })
    clearForm()
  }
}
</script>

<style scoped>
.text-danger {
  color: red;
}
</style>
