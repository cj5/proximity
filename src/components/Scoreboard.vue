<template>
  <div class="scoreboard">
    <div class="score-p1">
      <p class="heading">Player 1</p>
      <p>
        <span>Spots: </span>
        <span class="value">{{ this.spotsP1 }}</span>
      </p>
      <p>
        <span>Score: </span>
        <span class="value">{{ this.scoreP1 }}</span>
      </p>
    </div>
    <div class="turn-status">
      <div v-if="!this.turnValue" class="result">{{ this.gameResult }}</div>
      <div :class="`turn spot ${this.turnClass}`">
        <span>{{ this.turnValue }}</span>
      </div>
    </div>
    <div class="score-p2">
      <p class="heading">Player 2</p>
      <p>
        <span>Spots: </span>
        <span class="value">{{ this.spotsP2 }}</span>
      </p>
      <p>
        <span>Score: </span>
        <span class="value">{{ this.scoreP2 }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Scoreboard',
  computed: {
    ...mapState([
      'spotsP1',
      'scoreP1',
      'spotsP2',
      'scoreP2',
      'turnValue',
      'turnClass',
      'gameResult'
    ])
  }
}
</script>