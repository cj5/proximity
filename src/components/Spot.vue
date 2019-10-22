<template>
  <div class="spot-wrap">
    <div class="spot empty" @click="move" :data-key="dataKey">
      <span v-if="this.placements[dataKey]">
        {{ this.placements[dataKey].value }}
      </span>
      <span v-if="this.testMode" class="key">{{ dataKey }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Spot',
  props: {
    dataKey: Number
  },
  computed: {
    ...mapState([
      'placements',
      'testMode',
      'turnClass'
    ])
  },
  methods: {
    ...mapActions([
      'move'
    ])
  }
}
</script>