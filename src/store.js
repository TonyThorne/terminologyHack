import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    errorMsg: '',
    loading: false
  },
  getters: {
    errorMsg (state) {
      return state.errorMsg
    },
    loading (state) {
      return state.loading
    }
  },
  mutations: {
    setErrorMsg (state, payload) {
      state.errorMsg = payload
    },
    clearErrorMsg (state) {
      state.errorMsg = ''
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    // Receive errors from outside the store
    setErrorMsg ({ commit }, payload) {
      commit('setErrorMsg', payload)
    },
    // Clear errorMsg from components.
    clearErrorMsg ({ commit }) {
      commit('clearErrorMsg')
    },
    setLoading ({ commit }, payload) {
      commit('setLoading', payload)
    }
  },
  modules: {

  }
})
