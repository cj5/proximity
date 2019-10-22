<template>
  <div class="spot-wrap">
    <div class="spot empty" @click="move" :data-key="dataKey">
      <span v-if="this.$store.state.testMode" class="key">{{ dataKey }}</span>
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
  methods: {
    ...mapActions([
      'incrementTurn',
      'incrementTurnP1',
      'incrementTurnP2',
      'move'
    ])
  }
}
</script>