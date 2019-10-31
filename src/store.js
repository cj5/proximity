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
    gameResult: '',
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
        return window[array]
      }

      // FISHER-YATES SHUFFLE
      const shuffle = (array) => {
        let i = array.length
        while (i !== 0) {
          let random = Math.floor(Math.random() * i)
          i -= 1

          let temp = array[i]
          array[i] = array[random]
          array[random] = temp
        }
        return array
      }

      state.valuesP1 = shuffle(createValuesArray('valuesP1'))
      state.valuesP2 = shuffle(createValuesArray('valuesP2'))

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
      // console.log(state.placements)
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
      // console.log(state.placements)
      state.turnValue = state.valuesP1[state.turnP1 - 1]
      state.turnClass = 'p1'
      state.turnP2++
    },
    computerMove(state) {
      console.log('computerMove()')
      for (let i = 0; i < state.placements.length; i++) {
        if (state.placements[i]) {
          console.log(
            `spot_${i}:`,
            `(${state.placements[i].owner},`,
            `${state.placements[i].value})`
          )
        }
      }
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
    decideWinner(state) {
      console.log('game over')
      if (state.scoreP2 > state.scoreP1) {
        state.turnClass = 'p2'
      } else if (state.scoreP1 === state.scoreP2) {
        state.turnClass = 'empty'
      }
      state.scoreP1 === state.scoreP2
        ? state.gameResult = 'Tie game'
        : state.gameResult = 'Winner'
    },
    updateSurrounding(state, surroundingSpot) {
      let el = document.querySelector(`[data-key="${surroundingSpot}"`)
      if (state.placements[surroundingSpot]) {
        // console.log(JSON.stringify(state.placements[surroundingSpot], null, 2))
        
        let surrounding = state.placements[surroundingSpot]
        let target = state.placements[event.target.dataset.key]
        // INCREMENT SURROUNDING SPOT IF YOURS
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
      if (event.target.classList.contains('empty')) {
        if (state.turn % 2) {
          commit('moveP1', spot)
        } else {
          commit('moveP2', spot)
          commit('computerMove')
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
        const surrounding12 = [-12, -1] // spot 119
        const surroundingSpot = (array) => {
          for (let i = 0; i < array.length; i++) {
            let surroundingSpot = +spot + +array[i]
            commit('updateSurrounding', surroundingSpot)
          }
        }
        const checkSpots = (array, min, max, statement = true) => {
          switch(statement) {
          case (spot >= min && spot <= max):
            return surroundingSpot(array)
          }
          if (max === undefined) {
            switch(statement) {
            case (spot == min): 
              return surroundingSpot(array)
            }
          }
        }

        checkSpots(surrounding1, 13, 22)
        checkSpots(surrounding1, 37, 46)
        checkSpots(surrounding1, 61, 70)
        checkSpots(surrounding1, 85, 94)

        checkSpots(surrounding2, 25, 34)
        checkSpots(surrounding2, 49, 58)
        checkSpots(surrounding2, 73, 82)
        checkSpots(surrounding2, 97, 106)

        checkSpots(surrounding3, 1, 10)

        checkSpots(surrounding4, 109, 118)

        checkSpots(surrounding5, 12)
        checkSpots(surrounding5, 36)
        checkSpots(surrounding5, 60)
        checkSpots(surrounding5, 84)

        checkSpots(surrounding6, 24)
        checkSpots(surrounding6, 48)
        checkSpots(surrounding6, 72)
        checkSpots(surrounding6, 96)

        checkSpots(surrounding7, 23)
        checkSpots(surrounding7, 47)
        checkSpots(surrounding7, 71)
        checkSpots(surrounding7, 95)

        checkSpots(surrounding8, 35)
        checkSpots(surrounding8, 59)
        checkSpots(surrounding8, 83)
        checkSpots(surrounding8, 107)

        checkSpots(surrounding9, 0)
        checkSpots(surrounding10, 11)
        checkSpots(surrounding11, 108)
        checkSpots(surrounding12, 119)

        commit('scoring')
        commit('incrementTurn')
        if (state.turn > 120) {
          commit('decideWinner')
        }
      }
    } // move()
  }
})