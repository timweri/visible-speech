<template>
  <div id="Room">
    <div class="outer-wrapper">
      <div v-if="!this.$store.state.connected">
        <span>Connecting to server</span>
        <md-progress-bar id="connect-server-progress" md-mode="indeterminate"></md-progress-bar>
      </div>
      <div>
        <h1>{{ this.$store.state.roomId }}</h1>
      </div>
      <div id="language-selector" class="md-layout-item">
        <md-field>
          <label for="language">Language</label>
          <md-select v-model="language" name="language" id="language">
            <md-option value="fight-club">Fight Club</md-option>
            <md-option value="godfather">Godfather</md-option>
            <md-option value="godfather-ii">Godfather II</md-option>
            <md-option value="godfather-iii">Godfather III</md-option>
            <md-option value="godfellas">Godfellas</md-option>
            <md-option value="pulp-fiction">Pulp Fiction</md-option>
            <md-option value="scarface">Scarface</md-option>
          </md-select>
        </md-field>
      </div>
      <md-button id="leave-btn" class="md-raised" v-on:click="leaveRoom">Leave</md-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Room',
  data: () => ({
    language: null,
  }),
  sockets: {
    not_in_room: function() {
      this.$dialog.alert('You are not in any room')
    },
    room_left: function() {
      this.$emit('left-room')
      console.log('Server: Left room')
    }
  },
  methods: {
    leaveRoom: function() {
      this.$socket.client.emit('leave_room')
      console.log('Leave room')
    }
  }
}
</script>

<style>
#connect-server-progress {
  margin: auto;
  width: 150px;
}

#language-selector {
  width: 300px;
  margin: auto;
}

.outer-wrapper {
  width: 700px;
  margin: auto;
}
</style>
