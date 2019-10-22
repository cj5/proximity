<template>
  <div id="app">
    <h1 class="heading">Proximity</h1>
    <Gameboard />
    <Scoreboard />
  </div>
</template>

<script>
import Gameboard from './components/Gameboard'
import Scoreboard from './components/Scoreboard'

export default {
  name: 'app',
  components: {
    Gameboard,
    Scoreboard
  },
  mounted() {
    this.$store.dispatch('initValues')
  }
}
</script>

<style lang="scss">
  @import 'styles/main.scss';
</style>