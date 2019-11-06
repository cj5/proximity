<template>
  <div id="app">
    <div class="test-wrap">
      <div class="test" :style="`background-color: ${color};`"></div>
      <p>Server should make this GREEN not RED</p>
    </div>
    <h1 class="heading">Proximity</h1>
    <Gameboard />
    <Scoreboard />
  </div>
</template>

<script>
import io from 'socket.io-client'
import Gameboard from './components/Gameboard'
import Scoreboard from './components/Scoreboard'

export default {
  name: 'app',
  components: {
    Gameboard,
    Scoreboard
  },
  data() {
    return {
      socket: {},
      color: 'red'
    }
  },
  created() {
    this.socket = io('http://localhost:3000')
  },
  mounted() {
    this.$store.dispatch('initValues')
    this.socket.on('color', data => {
      this.color = data
    })
  }
}
</script>

<style lang="scss">
  @import 'styles/main.scss';
</style>