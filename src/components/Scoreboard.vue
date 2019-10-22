<template>
  <div class="scoreboard">
    <div class="score-p1">
      <span class="heading">Player 1</span>
      <span>Spots: <span class="value">{{ this.$store.state.spotsP1 }}</span></span>
      <span>Score: <span class="value">{{ this.$store.state.scoreP1 }}</span></span>
    </div>
    <div class="turn spot" :class="turnClass">{{ turnValue }}</div>
    <div class="score-p2">
      <span class="heading">Player 2</span>
      <span>Spots: <span class="value">{{ this.$store.state.spotsP2 }}</span></span>
      <span>Score: <span class="value">{{ this.$store.state.scoreP2 }}</span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scoreboard',
  computed: {
    turnValue() {
      if (this.$store.state.turn % 2) {
        return this.$store.state.valuesP1[this.$store.state.turnP1 - 1]
      } else {
        return this.$store.state.valuesP2[this.$store.state.turnP2 - 1]
      }
    },
    turnClass() {
      if (this.$store.state.turn % 2) {
        return 'p1'
      } else {
        return 'p2'
      }
    }
  }
}
</script>