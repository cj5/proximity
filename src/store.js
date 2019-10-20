import Vue from 'vue'
import Vuex from 'vuex'

let valuesP1 = []
let valuesP2 = []
for (let i = 1; i <= 60; i++) {
  if (i <= 20) {
    valuesP1.push(i)
    valuesP2.push(i)
  } else if (i > 20 && i <= 40) {
    valuesP1.push(i - 20)
    valuesP2.push(i - 20)
  } else {
    valuesP1.push(i - 40)
    valuesP2.push(i - 40)
  }
}

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

shuffle(valuesP1)
shuffle(valuesP2)

console.log(valuesP1)
console.log(valuesP2)

let placements = Array.from(Array(120), () => null)
console.log(placements)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    turn: 1,
    turnP1: 1,
    turnP2: 1,
    valuesP1,
    valuesP2,
    placements,
    scoreP1: 0,
    scoreP2: 0,
    territoriesP1: 0,
    territoriesP2: 0
  },
  mutations: {
    incrementTurn(state) {
      state.turn++
    },
    incrementTurnP1(state) {
      state.turnP1++
    },
    incrementTurnP2(state) {
      state.turnP2++
    }
  }
})