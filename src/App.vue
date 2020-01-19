<template>
  <div id="app">
    <ServerStatus />
    <h1 class="heading">Proximity</h1>
    <Gameboard />
    <Scoreboard />
  </div>
</template>

<script>
import Gameboard from './components/Gameboard'
import Scoreboard from './components/Scoreboard'
import ServerStatus from './components/ServerStatus'

export default {
  name: 'app',
  components: {
    Gameboard,
    Scoreboard,
    ServerStatus
  },
  mounted() {
    this.$store.dispatch('initValues')
  }
}
</script>

<style lang="scss">
  @import 'styles/main.scss';
</style>