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
    spotsP1: 0,
    spotsP2: 0
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
  },
  actions: {
    move({ commit }) {
      console.log(event)
      if (event.target.classList.contains('empty')) {
        if (this.state.turn % 2) {
          event.target.classList.replace('empty', 'p1')
          event.target.textContent = this.state.valuesP1[this.state.turnP1 - 1]
          let placementInfo = {
            owner: 'p1',
            value: this.state.valuesP1[this.state.turnP1 - 1]
          }
          this.state.placements[this.$vnode.key] = placementInfo
          console.log(this.state.placements)
          commit('incrementTurnP1')
        } else {
          event.target.classList.replace('empty', 'p2')
          event.target.textContent = this.state.valuesP2[this.state.turnP2 - 1]
          let placementInfo = {
            owner: 'p2',
            value: this.state.valuesP2[this.state.turnP2 - 1]
          }
          this.state.placements[this.$vnode.key] = placementInfo
          console.log(this.state.placements)
          commit('incrementTurnP2')
        }

        commit('incrementTurn')
        let placed = this.$store.state.placements.filter(x => x)
        let placedP1 = placed.filter(x => x.owner === 'p1')
        let placedP2 = placed.filter(x => x.owner === 'p2')
        this.$store.state.scoreP1 = 0
        placedP1.map(x => this.$store.state.scoreP1 += x.value)
        this.$store.state.scoreP2 = 0
        placedP2.map(x => this.$store.state.scoreP2 += x.value)
        this.$store.state.spotsP1 = placedP1.length
        this.$store.state.spotsP2 = placedP2.length

        const surrounding1 = [-12, -11, -1, 1, 12, 13]
        const surrounding2 = [-13, -12, -1, 1, 11, 12]
        if (this.showKey) {
          if (
            this.$vnode.key >= 0 && this.$vnode.key <= 11 ||
            this.$vnode.key >= 24 && this.$vnode.key <= 35 ||
            this.$vnode.key >= 48 && this.$vnode.key <= 59 ||
            this.$vnode.key >= 72 && this.$vnode.key <= 83 ||
            this.$vnode.key >= 96 && this.$vnode.key <= 107
          ) {
            for (let i = 0; i < surrounding2.length; i++) {
              document.querySelector(`[data-key="${this.$vnode.key + surrounding2[i]}"`).classList.add('highlight')
            }
          } else {
            for (let i = 0; i < surrounding1.length; i++) {
              document.querySelector(`[data-key="${this.$vnode.key + surrounding1[i]}"`).classList.add('highlight')
            }
          }
        }
      }
    },
    incrementTurn({ commit }) {
      commit('incrementTurn')
    },
    incrementTurnP1({ commit }) {
      commit('incrementTurnP1')
    },
    incrementTurnP2({ commit }) {
      commit('incrementTurnP2')
    }
  }
})