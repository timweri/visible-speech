import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
 
export default new Vuex.Store({
    state: {
        connected: false,
        roomId: "",
    },
    mutations: {
        "<MUTATION_PREFIX><EVENT_NAME>"() {
            // do something
        },
        SOCKET_DISCONNECT (store) {
            store.connected = false;
        },
        SOCKET_CONNECT (store) {
            store.connected = true;
        },
        SOCKET_SET_ROOMID (store, roomId) {
            store.roomId = roomId
        }
    },
    actions: {
        "<ACTION_PREFIX><EVENT_NAME>"() {
            // do something
        }
    }
})
