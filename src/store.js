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
    testMode: true
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

      createValuesArray('valuesP1')
      createValuesArray('valuesP2')
      state.valuesP1 = shuffle(valuesP1)
      state.valuesP2 = shuffle(valuesP2)

      console.log(state.valuesP1)
      console.log(state.valuesP2)

      state.turnValue = state.valuesP1[state.turnP1 - 1]
    },
    moveP1(state, spot) {
      event.target.classList.replace('empty', 'p1')
      let placementInfo = {
        owner: 'p1',
        value: state.valuesP1[state.turnP1 - 1]
      }
      state.placements.splice(spot, 1, placementInfo)
      console.log(state.placements)
      state.turnValue = state.valuesP2[state.turnP2 - 1]
      state.turnClass = 'p2'
      state.turnP1++
    },
    moveP2(state, spot) {
      event.target.classList.replace('empty', 'p2')
      let placementInfo = {
        owner: 'p2',
        value: state.valuesP2[state.turnP2 - 1]
      }
      state.placements.splice(spot, 1, placementInfo)
      console.log(state.placements)
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
    updateSurrounding(state, surroundingSpot) {
      let el = document.querySelector(`[data-key="${surroundingSpot}"`)
      if (state.placements[surroundingSpot]) {
        console.log(JSON.stringify(state.placements[surroundingSpot], null, 2))
        
        let surrounding = state.placements[surroundingSpot]
        let target = state.placements[event.target.dataset.key]
        // INCREMENT SURROUNDING SPOT IF YOURS AND SMALLER
        if (
          surrounding.owner === 'p1' &&
          target.owner === 'p1' &&
          surrounding.value < 20
        ) {
          surrounding.value++
        }
        if (
          surrounding.owner === 'p2' &&
          target.owner === 'p2' &&
          surrounding.value < 20
        ) {
          surrounding.value++
        }

        // STEAL SURROUNDING SPOT IF OPPONENT AND SMALLER
        if (
          surrounding.owner === 'p2' &&
          target.owner === 'p1' &&
          surrounding.value < target.value
        ) {
          el.classList.replace('p2', 'p1')
          surrounding.owner = 'p1'
        }
        if (
          surrounding.owner === 'p1' &&
          target.owner === 'p2' &&
          surrounding.value < target.value
        ) {
          el.classList.replace('p1', 'p2')
          surrounding.owner = 'p2'
        }

      }
      if (state.testMode) {
        el.classList.add('highlight')
      }
    }
  },
  actions: {
    initValues({ commit }) {
      commit('initValues')
    },
    move({ commit, state }) {
      let spot = event.target.dataset.key
      console.log(spot)
      if (event.target.classList.contains('empty')) {
        if (state.turn % 2) {
          commit('moveP1', spot)
        } else {
          commit('moveP2', spot)
        }
        // THIS NEEDS SOME CLEVER REFACTORING :grimacing:
        const surrounding1 = [-12, -11, -1, 1, 12, 13]
        const surrounding2 = [-13, -12, -1, 1, 11, 12]
        const surrounding3 = [-1, 1, 11, 12]
        const surrounding4 = [-11, -12, -1, 1]
        const surrounding5 = [-12, -11, 1, 12, 13]
        const surrounding6 = [-12, 1, 12]
        const surrounding7 = [-12, -1, 12]
        const surrounding8 = [-13, -12, -1, 11, 12]
        const surrounding9 = [1, 12] // spot 0
        const surrounding10 = [-1, 11, 12] // spot 11
        const surrounding11 = [-12, -11, 1] // spot 108
        const surrounding12 = [-12, -1] //spot 119
        if (
          spot >= 13 && spot <= 22 ||
          spot >= 37 && spot <= 46 ||
          spot >= 61 && spot <= 70 ||
          spot >= 85 && spot <= 94
        ) {
          for (let i = 0; i < surrounding1.length; i++) {
            let surroundingSpot = +spot + +surrounding1[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (
          spot >= 25 && spot <= 34 ||
          spot >= 49 && spot <= 58 ||
          spot >= 73 && spot <= 82 ||
          spot >= 97 && spot <= 106
        ) {
          for (let i = 0; i < surrounding2.length; i++) {
            let surroundingSpot = +spot + +surrounding2[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (spot >= 1 && spot <= 10) {
          for (let i = 0; i < surrounding3.length; i++) {
            let surroundingSpot = +spot + +surrounding3[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (spot >= 109 && spot <= 118) {
          for (let i = 0; i < surrounding4.length; i++) {
            let surroundingSpot = +spot + +surrounding4[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (
          spot == 12 ||
          spot == 36 ||
          spot == 60 ||
          spot == 84
        ) {
          for (let i = 0; i < surrounding5.length; i++) {
            let surroundingSpot = +spot + +surrounding5[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (
          spot == 24 ||
          spot == 48 ||
          spot == 72 ||
          spot == 96
        ) {
          for (let i = 0; i < surrounding6.length; i++) {
            let surroundingSpot = +spot + +surrounding6[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (
          spot == 23 ||
          spot == 47 ||
          spot == 71 ||
          spot == 95
        ) {
          for (let i = 0; i < surrounding7.length; i++) {
            let surroundingSpot = +spot + +surrounding7[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (
          spot == 35 ||
          spot == 59 ||
          spot == 83 ||
          spot == 107
        ) {
          for (let i = 0; i < surrounding8.length; i++) {
            let surroundingSpot = +spot + +surrounding8[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (spot == 0) {
          console.log('hello?')
          for (let i = 0; i < surrounding9.length; i++) {
            let surroundingSpot = +spot + +surrounding9[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (spot == 11) {
          for (let i = 0; i < surrounding10.length; i++) {
            let surroundingSpot = +spot + +surrounding10[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (spot == 108) {
          for (let i = 0; i < surrounding11.length; i++) {
            let surroundingSpot = +spot + +surrounding11[i]
            commit('updateSurrounding', surroundingSpot)
          }
        } else if (spot == 119) {
          for (let i = 0; i < surrounding12.length; i++) {
            let surroundingSpot = +spot + +surrounding12[i]
            commit('updateSurrounding', surroundingSpot)
          }
        }
        commit('scoring')
        commit('incrementTurn')
      }
    }
  }
})