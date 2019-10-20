<template>
  <div id="app">
    <h1 class="heading">Proximity</h1>
    <Gameboard />
  </div>
</template>

<script>
import Gameboard from './components/Gameboard'

export default {
  name: 'app',
  components: {
    Gameboard
  }
}
</script>

<style lang="scss">
  @import 'styles/main.scss';
</style>