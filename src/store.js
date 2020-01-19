import Vue from 'vue'
import Vuex from 'vuex'
import spotsModel from './spotsModel'
import io from 'socket.io-client'

const socket = io('http://localhost:3000')

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
      const valuesP1 = shuffle(createValuesArray('valuesP1'))
      const valuesP2 = shuffle(createValuesArray('valuesP2'))
      
      socket.emit('valuesP1', valuesP1)
      socket.emit('valuesP2', valuesP2)

      socket.on('emitData', x => {
        state.valuesP1 = x.valuesP1,
        state.valuesP2 = x.valuesP2
        state.turnValue = state.valuesP1[state.turnP1 - 1]
      })

      // state.valuesP1 = shuffle(createValuesArray('valuesP1'))
      // state.valuesP2 = shuffle(createValuesArray('valuesP2'))

      // console.log(state.valuesP1)
      // console.log(state.valuesP2)

      // state.turnValue = state.valuesP1[state.turnP1 - 1]
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
        console.log(JSON.stringify(state.placements[surroundingSpot], null, 2))
        
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
        }
        
        const surroundingSpot = (array) => {
          array.map(z => {
            let surroundingSpot = +spot + z
            commit('updateSurrounding', surroundingSpot)
          })
        }

        spotsModel.map(x => {
          if (x.spotRanges) {
            x.spotRanges.map(y => {
              if (spot >= y.min && spot <= y.max) {
                surroundingSpot(x.surrounding)
              }
            }) 
          } else if (x.spots) {
            x.spots.map(y => {
              if (spot == y) {
                surroundingSpot(x.surrounding)
              }
            })
          }
        })

        commit('scoring')
        commit('incrementTurn')
        if (state.turn > 120) {
          commit('decideWinner')
        }
      }
    } // move()
  }
})