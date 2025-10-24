import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'   // ✅ 导入你的 router 实例

import 'bootstrap/dist/css/bootstrap.min.css'   // ✅ Bootstrap 样式
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // ✅ 可选交互组件

const app = createApp(App)
app.use(router)   // ✅ 这一步非常关键！注册 Vue Router
app.mount('#app')
