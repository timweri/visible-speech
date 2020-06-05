import config from './config'
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueMaterial from 'vue-material'
import VuejsDialog from 'vuejs-dialog'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import 'vuejs-dialog/dist/vuejs-dialog.min.css'
import VueSocketIOExt from 'vue-socket.io-extended'
import SocketIO from "socket.io-client"

Vue.use(VueMaterial)
Vue.use(VuejsDialog)

const socket = SocketIO.connect(`${config.server.host}:${config.server.port}${config.server.socketPath}`)

Vue.use(VueSocketIOExt, socket)

socket.on('connect', () => {
  console.log('Connected to server')
  store.commit('SOCKET_CONNECT')
})

socket.on('disconnect', () => {
  console.log('Disconnected from server')
  store.commit('SOCKET_DISCONNECT')
})

socket.on('message', (message) => {
  console.log(`Message from server: ${message}`)
})

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')

