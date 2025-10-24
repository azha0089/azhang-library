import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import FirebaseSigninView from '../views/FirebaseSigninView.vue'
import GetBookCountView from '../views/GetBookCountView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView
  },
  {
    path: '/GetBookCount',
    name: 'GetBookCount',
    component: GetBookCountView
  },
  {
  path: '/CurrentWeather',
  name: 'CurrentWeather',
  component: () => import('../views/CurrentWeatherView.vue')
},

  {
  path: '/WeatherCheck',
  name: 'GetWeather',
  component: () => import('../views/WeatherView.vue')
}

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
