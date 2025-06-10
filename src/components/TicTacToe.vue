<template>
  <div class="tictactoe">
    <h2>井字棋</h2>
    <div class="board">
      <div v-for="(cell, idx) in board" :key="idx" class="cell" @click="makeMove(idx)">
        {{ cell }}
      </div>
    </div>
    <div class="info">
      <p v-if="winner">{{ winnerMsg }}</p>
      <p v-else>当前玩家: {{ currentPlayer }}</p>
      <button @click="reset">重置</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const board = ref(Array(9).fill(''));
const currentPlayer = ref('X');
const winner = ref('');

const winnerMsg = computed(() => {
  if (winner.value === 'Draw') return '平局!';
  if (winner.value) return `胜者: ${winner.value}`;
  return '';
});

function makeMove(idx) {
  if (board.value[idx] || winner.value) return;
  board.value[idx] = currentPlayer.value;
  if (checkWinner()) {
    winner.value = currentPlayer.value;
  } else if (board.value.every(cell => cell)) {
    winner.value = 'Draw';
  } else {
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }
}

function checkWinner() {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return lines.some(([a,b,c]) => {
    return board.value[a] && board.value[a] === board.value[b] && board.value[a] === board.value[c];
  });
}

function reset() {
  board.value = Array(9).fill('');
  currentPlayer.value = 'X';
  winner.value = '';
}
</script>

<style scoped>
.tictactoe { max-width: 300px; margin: 0 auto; }
.board {
  display: grid;
  grid-template-columns: repeat(3, 60px);
  grid-gap: 5px;
  margin-bottom: 10px;
}
.cell {
  width: 60px;
  height: 60px;
  background: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
  border: 1px solid #ccc;
}
.info { text-align: center; }
</style>

