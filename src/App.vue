<template>
  <div style="max-width:900px;margin:40px auto;">
    <el-row justify="center" gutter="20">
      <el-col :span="24">
        <h1 style="text-align:center;">小游戏盒子</h1>
        <p style="text-align:center;">精选有趣的网页小游戏，点击即可畅玩！</p>
      </el-col>
      <el-col :xs="24" :sm="12" :md="8" v-for="game in games" :key="game.path">
        <el-card shadow="hover" style="margin-bottom:20px;">
          <h2>{{ game.name }}</h2>
          <p>{{ game.desc }}</p>
          <el-button type="primary" @click="router.push(game.path)">进入游戏</el-button>
        </el-card>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElCard, ElButton, ElRow, ElCol } from 'element-plus'
const router = useRouter()

const games = [
  { name: '贪吃蛇', path: '/snake', desc: '经典贪吃蛇小游戏' },
  // 你可以在这里添加更多小游戏
]
</script>

<style scoped>
/* 响应式居中 */
</style>
