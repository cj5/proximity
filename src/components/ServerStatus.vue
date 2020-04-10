<template>
  <div class="server-status" v-if="this.testMode">
    <span style="font-style: italic;">Server: </span>
    <span class="indicator" :style="`background-color: ${data.color}`"></span>
    <span>{{ data.isServer ? `Connected [ ${data.serverId} ]` : 'Not connected' }}</span>
  </div>
</template>

<script>
import io from 'socket.io-client'
import { mapState } from 'vuex'
import { port } from '../global'

export default {
  name: 'ServerStatus',
  data() {
    return {
      socket: {},
      data: {
        color: 'red',
        isServer: false,
        serverId: ''
      }
    }
  },
  computed: {
    ...mapState(['testMode'])
  },
  created() {
    this.socket = io(`http://localhost:${port}`)
  },
  mounted() {
    this.socket.on('emitData', x => {
      this.data.color = x.color,
      this.data.isServer = x.isServer,
      this.data.serverId = x.id
    })
  }
}
</script>