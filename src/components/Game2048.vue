<template>
  <div class="game2048">
    <h2>2048</h2>
    <div class="board">
      <div v-for="(row, i) in board" :key="i" class="row">
        <div v-for="(cell, j) in row" :key="j" class="cell">
          <span v-if="cell">{{ cell }}</span>
        </div>
      </div>
    </div>
    <div class="controls">
      <button @click="move('up')">↑</button>
      <button @click="move('left')">←</button>
      <button @click="move('down')">↓</button>
      <button @click="move('right')">→</button>
      <button @click="reset">重置</button>
    </div>
    <div class="info">
      <p>分数: {{ score }}</p>
      <p v-if="gameOver">游戏结束!</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const size = 4;
const board = ref([]);
const score = ref(0);
const gameOver = ref(false);

function initBoard() {
  board.value = Array.from({ length: size }, () => Array(size).fill(0));
  score.value = 0;
  gameOver.value = false;
  addRandom();
  addRandom();
}

function addRandom() {
  const empty = [];
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!board.value[i][j]) empty.push([i, j]);
    }
  }
  if (empty.length) {
    const [i, j] = empty[Math.floor(Math.random() * empty.length)];
    board.value[i][j] = Math.random() < 0.9 ? 2 : 4;
  }
}

function move(dir) {
  if (gameOver.value) return;
  let moved = false;
  function slide(row) {
    let arr = row.filter(n => n);
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] === arr[i + 1]) {
        arr[i] *= 2;
        score.value += arr[i];
        arr[i + 1] = 0;
      }
    }
    arr = arr.filter(n => n);
    while (arr.length < size) arr.push(0);
    return arr;
  }
  if (dir === 'left') {
    for (let i = 0; i < size; i++) {
      const old = [...board.value[i]];
      board.value[i] = slide(board.value[i]);
      if (old.join() !== board.value[i].join()) moved = true;
    }
  } else if (dir === 'right') {
    for (let i = 0; i < size; i++) {
      const old = [...board.value[i]];
      board.value[i] = slide(board.value[i].slice().reverse()).reverse();
      if (old.join() !== board.value[i].join()) moved = true;
    }
  } else if (dir === 'up') {
    for (let j = 0; j < size; j++) {
      const col = board.value.map(row => row[j]);
      const newCol = slide(col);
      for (let i = 0; i < size; i++) {
        if (board.value[i][j] !== newCol[i]) moved = true;
        board.value[i][j] = newCol[i];
      }
    }
  } else if (dir === 'down') {
    for (let j = 0; j < size; j++) {
      const col = board.value.map(row => row[j]);
      const newCol = slide(col.reverse()).reverse();
      for (let i = 0; i < size; i++) {
        if (board.value[i][j] !== newCol[i]) moved = true;
        board.value[i][j] = newCol[i];
      }
    }
  }
  if (moved) {
    addRandom();
    if (isGameOver()) gameOver.value = true;
  }
}

function isGameOver() {
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      if (!board.value[i][j]) return false;
      if (i < size - 1 && board.value[i][j] === board.value[i + 1][j]) return false;
      if (j < size - 1 && board.value[i][j] === board.value[i][j + 1]) return false;
    }
  }
  return true;
}

function reset() {
  initBoard();
}

initBoard();
</script>

<style scoped>
.game2048 { max-width: 320px; margin: 0 auto; }
.board {
  background: #bbada0;
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 10px;
}
.row {
  display: flex;
}
.cell {
  width: 60px;
  height: 60px;
  margin: 4px;
  background: #eee4da;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: bold;
  border-radius: 3px;
}
.controls { text-align: center; margin-bottom: 10px; }
.controls button { margin: 0 2px; }
.info { text-align: center; }
</style>

