<template>
  <!-- 12 x 10 -->
  <div class="spot-wrap">
    <div class="spot empty" @click="move"></div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Spot',
  computed: {
    ...mapState([
      'turn'
    ])
  },
  methods: {
    ...mapMutations([
      'increment'
    ]),
    move(e) {
      // const spot = Array.prototype.slice.call(document.querySelectorAll('.spot'))

      console.log(this.$store.state.turn)

      if (e.target.classList.contains('empty')) {
        e.target.classList.replace('empty', 'player-1')
        this.$store.commit('increment')
      }
      console.log(this.$store.state.turn)
    }
  }
}
</script>