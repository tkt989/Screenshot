import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState } from 'vuex-electron'
import { ipcRenderer } from 'electron'

Vue.use(Vuex)

const state = {
  devices: [],
  id: null,
  screencapUri: null
}

const mutations = {
  updateDevices(state, devices) {
    Vue.set(state, 'devices', devices)
  },

  selectDevice(state, id) {
    state.id = id
  },

  screencapUri(state, uri) {
    state.screencapUri = uri
  }
}

const actions = {
  updateDevices({ commit }) {
    ipcRenderer.once('devices-result', (event, devices) => {
      commit('updateDevices', devices)
    })
    ipcRenderer.send('devices')
  },

  selectDevice({ commit }, id) {
    commit('selectDevice', id)
  },

  screencap({ state, commit }) {
    ipcRenderer.once('screencap-result', (event, uri) => {
      console.log(uri)
      commit('screencapUri', uri)
    })
    ipcRenderer.send('screencap', state.id)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production'
})
