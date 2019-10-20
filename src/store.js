import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    turn: 1
  },
  mutations: {
    increment(state) {
      state.turn++
    }
  }
})