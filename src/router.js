import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SnakeGame from './components/SnakeGame.vue'

const routes = [
  { path: '/', component: App },
  { path: '/snake', component: SnakeGame },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

