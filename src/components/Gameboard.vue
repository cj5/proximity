<template>
  <div class="gameboard-wrap">
    <div class="gameboard">
      <Spot v-for="(i, key) in 120" :key="key" />
    </div>
  </div>
</template>

<script>
import Spot from './Spot'

export default {
  name: 'Gameboard',
  components: {
    Spot
  }
}
</script>