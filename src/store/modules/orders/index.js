import axios from 'axios'
import { TOKEN_NAME, API_VERSION } from '@/configs/api'

const state = {
  myOrders : {
    data: []
  }
}

const mutations = {

    SET_ORDERS(state, orders) {
      state.myOrders = orders
    }, 

    SET_ORDER(state, order) {
      state.myOrders.data = order
    }, 
}

const actions = {

  getMyOrders ({commit}) {

    const token = localStorage.getItem(TOKEN_NAME)
    if(!token) Promise.reject()
    commit('SET_PRELOADER', true)
    commit('SET_TEXT_PRELOADER', 'Carregando os meus pedidos...')

    return axios.get(`${API_VERSION}/my-orders`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    })
      .then(response => commit('SET_ORDERS', response.data))
      .finally(commit('SET_PRELOADER', false))
  },

  getOrderByIdentify({commit}, identify) {
    const token = localStorage.getItem(TOKEN_NAME)
    if(!token) Promise.reject()
    
    commit('SET_PRELOADER', true)
    commit('SET_TEXT_PRELOADER', 'Carregando o pedido...')

    return axios.get(`${API_VERSION}/orders/${identify}`, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    }) 
      .finally(commit('SET_PRELOADER', false))
  },

  evaluationOrder({commit}, params) {
    const token = localStorage.getItem(TOKEN_NAME)
    if(!token) Promise.reject()
    
    commit('SET_PRELOADER', true)
    commit('SET_TEXT_PRELOADER', 'Gravando avaliação ...')

    return axios.post(`${API_VERSION}/orders/${params.identify}/evaluations`, params, {
      headers: {
        'Authorization' : `Bearer ${token}`
      }
    }) 
      .finally(commit('SET_PRELOADER', false))

  },

  createOrder({commit}, params) {
    return new Promise((resolve, reject) => {
      
      commit('SET_PRELOADER', true)
      commit('SET_TEXT_PRELOADER', 'Gravando pedido ...')
  
      axios.post(`${API_VERSION}/orders`, params) 
        .then(response => {
          commit('CLEAR_CART')

          resolve(response.data.data)
        })
        .catch(response => reject(response.error))
        .finally(commit('SET_PRELOADER', false))
      })
  },

  createOrderAuthenticated({commit}, params) {
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem(TOKEN_NAME)
      if(!token) reject()
      
      commit('SET_PRELOADER', true)
      commit('SET_TEXT_PRELOADER', 'Gravando pedido ...')
  
      axios.post(`${API_VERSION}/orders`, params, {
        headers: {
          'Authorization' : `Bearer ${token}`
        }
      }) 
        .then(response => {
          commit('CLEAR_CART')
          console.log(response.data.data)
          resolve(response.data.data)
        })
        .catch(response => reject(response.error))
        .finally(commit('SET_PRELOADER', false))
    })
  },

}

export default {
  state,
  mutations,
  actions
}