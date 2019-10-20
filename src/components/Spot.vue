<template>
  <div class="spot-wrap">
    <div class="spot empty" @click="move" :data-key="dataKey">
      <span class="key">{{ dataKey }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Spot',
  props: {
    dataKey: Number
  },
  methods: {
    move(e) {
      if (e.target.classList.contains('empty')) {
        if (this.$store.state.turn % 2) {
          e.target.classList.replace('empty', 'p1')
          e.target.textContent = this.$store.state.valuesP1[this.$store.state.turnP1 - 1]
          let placementInfo = {
            owner: 'p1',
            value: this.$store.state.valuesP1[this.$store.state.turnP1 - 1]
          }
          this.$store.state.placements[this.$vnode.key] = placementInfo
          console.log(this.$store.state.placements)
          this.$store.commit('incrementTurnP1')
        } else {
          e.target.classList.replace('empty', 'p2')
          e.target.textContent = this.$store.state.valuesP2[this.$store.state.turnP2 - 1]
          let placementInfo = {
            owner: 'p2',
            value: this.$store.state.valuesP2[this.$store.state.turnP2 - 1]
          }
          this.$store.state.placements[this.$vnode.key] = placementInfo
          console.log(this.$store.state.placements)
          this.$store.commit('incrementTurnP2')
        }
        this.$store.commit('incrementTurn')
        let placed = this.$store.state.placements.filter(x => x)
        let placedP1 = placed.filter(x => x.owner === 'p1')
        let placedP2 = placed.filter(x => x.owner === 'p2')
        this.$store.state.scoreP1 = 0
        placedP1.map(x => this.$store.state.scoreP1 += x.value)
        this.$store.state.scoreP2 = 0
        placedP2.map(x => this.$store.state.scoreP2 += x.value)
        this.$store.state.territoriesP1 = placedP1.length
        this.$store.state.territoriesP2 = placedP2.length
        console.log(this.$vnode.key)
        if (this.$vnode.key % 2) {
          document.querySelector(`[data-key="${this.$vnode.key - 12}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key - 11}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key - 1}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key + 1}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key + 12}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key + 13}"`).classList.add('test') 
        } else {
          console.log('even')
          document.querySelector(`[data-key="${this.$vnode.key - 12}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key - 11}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key - 1}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key + 1}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key + 12}"`).classList.add('test')
          document.querySelector(`[data-key="${this.$vnode.key + 13}"`).classList.add('test')
        }
      }
    }
  }
}
</script>