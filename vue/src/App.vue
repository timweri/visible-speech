<template>
  <div id="app">
    <component v-bind:is="currentComponent" v-on:joined-room="joinedRoom" v-on:left-room="leftRoom"></component>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    WaitingRoom: () => import('./components/WaitingRoom.vue'),
    Room: () => import('./components/Room.vue'),
  },
  data: () => ({
    roomcode: "",
    currentComponent: 'WaitingRoom',
  }),
  methods: {
    joinedRoom: function(roomId) {
      this.currentComponent = 'Room'
      this.$store.commit('SOCKET_SET_ROOMID', roomId)
    },
    leftRoom: function() {
      this.currentComponent = 'WaitingRoom'
      this.$store.commit('SOCKET_SET_ROOMID', null)
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
