import axios from 'axios'
import { API_VERSION } from '@/configs/api'

export default {

  state: {
    me: {
      name: '',
      email: ''
    },
    authenticated: false,
  },

  mutations: {
    SET_ME ( state, me) {
      state.me = me

      state.authenticated = true
    },

    SET_AUTHENTICATED (state, status) {
      state.authenticated = status
    },

    LOGOUT (state) {
      state.me = {
        name: '',
        email: '',
      }

      state.authenticated = false

    }
  },

  actions: {

    register({commit}, params) {
      console.log(params)
      return axios.post(`${API_VERSION}/clients`, params)
    }

  }

}