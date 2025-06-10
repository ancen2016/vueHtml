import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SnakeGame from './components/SnakeGame.vue'
import TicTacToe from './components/TicTacToe.vue'
import Game2048 from './components/Game2048.vue'

const routes = [
  { path: '/', component: App },
  { path: '/snake', component: SnakeGame },
  { path: '/tictactoe', component: TicTacToe },
  { path: '/2048', component: Game2048 },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
