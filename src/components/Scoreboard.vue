<template>
  <div class="scoreboard">
    <div class="score-p1">
      <p class="heading">Player 1</p>
      <p>
        <span>Spots: </span>
        <span class="value">
          {{ this.$store.state.spotsP1 }}
        </span>
      </p>
      <p>
        <span>Score: </span>
        <span class="value">
          {{ this.$store.state.scoreP1 }}
        </span>
      </p>
    </div>
    <div :class="`turn spot ${this.$store.state.turnClass}`">
      {{ this.$store.state.turnValue }}
    </div>
    <div class="score-p2">
      <p class="heading">Player 2</p>
      <p>
        <span>Spots: </span>
        <span class="value">
          {{ this.$store.state.spotsP2 }}
        </span>
      </p>
      <p>
        <span>Score: </span>
        <span class="value">
          {{ this.$store.state.scoreP2 }}
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scoreboard'
}
</script>