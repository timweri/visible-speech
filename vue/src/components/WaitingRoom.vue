<template>
  <div id="WaitingRoom">
    <div class="outer-wrapper">
      <div v-if="!this.$store.state.connected">
        <span>Connecting to server</span>
        <md-progress-bar id="connect-server-progress" md-mode="indeterminate"></md-progress-bar>
      </div>
      <div>
        <md-field id="room-code-input">
          <label>Room Code</label>
          <md-input v-model="roomcode" maxlength="4"></md-input>
        </md-field>
      </div>
      <br/><br/>
      <md-button id="join-btn" class="md-raised" v-on:click="joinRoom" :disabled="roomcode.length != 4">Join</md-button>
      <md-button id="create-btn" class="md-raised" v-on:click="createRoom">Create</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WaitingRoom',
  data: () => ({
    roomcode: "",
  }),
  sockets: {
    too_many_rooms() {
      this.$dialog.alert('Too many rooms')
      console.log('Server: Too many rooms')
    },
    invalid_room() {
      this.$dialog.alert('Invalid room ID')
      console.log('Server: Invalid room ID')
    },
    room_full() {
      this.$dialog.alert('Room is full')
      console.log('Server: Room is full')
    },
    room_joined(roomId) {
      this.$emit('joined-room', roomId)
      console.log('Server: Joined room')
    },
    room_created(roomId) {
      this.$emit('joined-room', roomId)
      console.log('Server: Room created')
    }
  },
  methods: {
    createRoom: function() {
      this.$socket.client.emit('create_room')
      console.log('Create room')
    },
    joinRoom: function() {
      this.$socket.client.emit('join_room', this.roomcode)
      console.log('Join room')
    }
  }
}
</script>

<style>
#connect-server-progress {
  margin: auto;
  width: 150px;
}

#room-code-input {
  width: 150px;
  margin: auto;
}

.outer-wrapper {
  width: 700px;
  margin: auto;
}
</style>
