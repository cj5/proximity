import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    turn: 1,
    turnP1: 1,
    turnP2: 1,
    valuesP1: [],
    valuesP2: [],
    placements: Array.from(Array(120), () => null),
    scoreP1: 0,
    scoreP2: 0,
    spotsP1: 0,
    spotsP2: 0,
    turnValue: 0,
    turnClass: 'p1',
    testMode: false
  },
  mutations: {
    initValues(state) {
      const createValuesArray = (array) => {
        window[array] = []
        for (let i = 1; i <= 60; i++) {
          if (i <= 20) {
            window[array].push(i)
          } else if (i > 20 && i <= 40) {
            window[array].push(i - 20)
          } else {
            window[array].push(i - 40)
          }
        }
      }
      
      createValuesArray('valuesP1')
      createValuesArray('valuesP2')

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

      state.valuesP1 = shuffle(valuesP1)
      state.valuesP2 = shuffle(valuesP2)

      console.log(state.valuesP1)
      console.log(state.valuesP2)

      state.turnValue = state.valuesP1[state.turnP1 - 1]
    },
    moveP1(state, spot) {
      console.log('moveP1')
      event.target.classList.replace('empty', 'p1')
      event.target.textContent = state.valuesP1[state.turnP1 - 1]
      let placementInfo = {
        owner: 'p1',
        value: state.valuesP1[state.turnP1 - 1]
      }
      state.placements[spot] = placementInfo
      console.log(state.placements)
      console.log(state.turnP1)
      state.turnValue = state.valuesP2[state.turnP2 - 1]
      state.turnClass = 'p2'
      state.turnP1++
    },
    moveP2(state, spot) {
      console.log('moveP2')
      event.target.classList.replace('empty', 'p2')
      event.target.textContent = state.valuesP2[state.turnP2 - 1]
      let placementInfo = {
        owner: 'p2',
        value: state.valuesP2[state.turnP2 - 1]
      }
      state.placements[spot] = placementInfo
      console.log(state.placements)
      console.log(state.turnP2)
      state.turnValue = state.valuesP1[state.turnP1 - 1]
      state.turnClass = 'p1'
      state.turnP2++
    },
    incrementTurn(state) {
      state.turn++
    },
    scoring(state) {
      let placed = state.placements.filter(x => x)
      let placedP1 = placed.filter(x => x.owner === 'p1')
      let placedP2 = placed.filter(x => x.owner === 'p2')
      state.scoreP1 = 0
      placedP1.map(x => state.scoreP1 += x.value)
      state.scoreP2 = 0
      placedP2.map(x => state.scoreP2 += x.value)
      state.spotsP1 = placedP1.length
      state.spotsP2 = placedP2.length
    },
    updateSurrounding(state, spot) {
      const surrounding1 = [-12, -11, -1, 1, 12, 13]
      const surrounding2 = [-13, -12, -1, 1, 11, 12]
      if (
        spot >= 0 && spot <= 11 ||
        spot >= 24 && spot <= 35 ||
        spot >= 48 && spot <= 59 ||
        spot >= 72 && spot <= 83 ||
        spot >= 96 && spot <= 107
      ) {
        for (let i = 0; i < surrounding2.length; i++) {
          let key = +spot + +surrounding2[i]
          let el = document.querySelector(`[data-key="${key}"`)
          if (state.testMode) {
            el.classList.add('highlight')
          }
        }
      } else {
        for (let i = 0; i < surrounding1.length; i++) {
          let key = +spot + +surrounding1[i]
          let el = document.querySelector(`[data-key="${key}"`)
          if (state.testMode) {
            el.classList.add('highlight')
          }
        }
      }
    }
  },
  actions: {
    initValues({ commit }) {
      commit('initValues')
    },
    move({ commit }) {
      let spot = event.target.dataset.key
      if (event.target.classList.contains('empty')) {
        if (this.state.turn % 2) {
          commit('moveP1', spot)
        } else {
          commit('moveP2', spot)
        }
        commit('incrementTurn')
        commit('scoring')
        commit('updateSurrounding', spot)        
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