<template>
  <div class="spot-wrap">
    <div class="spot empty" @click="move" :data-key="dataKey">
      <span v-if="showKey" class="key">{{ dataKey }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Spot',
  props: {
    dataKey: Number
  },
  data() {
    return {
      showKey: false
    }
  },
  methods: {
    ...mapActions([
      'incrementTurn',
      'incrementTurnP1',
      'incrementTurnP2',
      'move'
    ]),

    // move() {
      // if (e.target.classList.contains('empty')) {
        // this.turnTracking(e.target)

        // if (this.$store.state.turn % 2) {
        //   e.target.classList.replace('empty', 'p1')
        //   e.target.textContent = this.$store.state.valuesP1[this.$store.state.turnP1 - 1]
        //   let placementInfo = {
        //     owner: 'p1',
        //     value: this.$store.state.valuesP1[this.$store.state.turnP1 - 1]
        //   }
        //   this.$store.state.placements[this.$vnode.key] = placementInfo
        //   console.log(this.$store.state.placements)
        //   this.incrementTurnP1()
        // } else {
        //   e.target.classList.replace('empty', 'p2')
        //   e.target.textContent = this.$store.state.valuesP2[this.$store.state.turnP2 - 1]
        //   let placementInfo = {
        //     owner: 'p2',
        //     value: this.$store.state.valuesP2[this.$store.state.turnP2 - 1]
        //   }
        //   this.$store.state.placements[this.$vnode.key] = placementInfo
        //   console.log(this.$store.state.placements)
        //   this.incrementTurnP2()
        // }

        // this.incrementTurn()
        // let placed = this.$store.state.placements.filter(x => x)
        // let placedP1 = placed.filter(x => x.owner === 'p1')
        // let placedP2 = placed.filter(x => x.owner === 'p2')
        // this.$store.state.scoreP1 = 0
        // placedP1.map(x => this.$store.state.scoreP1 += x.value)
        // this.$store.state.scoreP2 = 0
        // placedP2.map(x => this.$store.state.scoreP2 += x.value)
        // this.$store.state.spotsP1 = placedP1.length
        // this.$store.state.spotsP2 = placedP2.length
        
        // const surrounding1 = [-12, -11, -1, 1, 12, 13]
        // const surrounding2 = [-13, -12, -1, 1, 11, 12]
        // if (this.showKey) {
        //   if (
        //     this.$vnode.key >= 0 && this.$vnode.key <= 11 ||
        //     this.$vnode.key >= 24 && this.$vnode.key <= 35 ||
        //     this.$vnode.key >= 48 && this.$vnode.key <= 59 ||
        //     this.$vnode.key >= 72 && this.$vnode.key <= 83 ||
        //     this.$vnode.key >= 96 && this.$vnode.key <= 107
        //   ) {
        //     for (let i = 0; i < surrounding2.length; i++) {
        //       document.querySelector(`[data-key="${this.$vnode.key + surrounding2[i]}"`).classList.add('highlight')
        //     }
        //   } else {
        //     for (let i = 0; i < surrounding1.length; i++) {
        //       document.querySelector(`[data-key="${this.$vnode.key + surrounding1[i]}"`).classList.add('highlight')
        //     }
        //   }
        // }

      // }
    // }
  }
}
</script>