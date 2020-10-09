<template>
<div>
  <div class="container container-body">
    <div class="my-6">
      <h1 class="title-tenant">Meus Pedidos</h1>
    </div>
    <div class="my-orders my-6">
      <div class="my-table-header mb-6">
        <div class="text-center"><b>Nª Pedido</b></div>
        <div class="text-center"><b>Data</b></div>
        <div class="text-center"><b>Status</b></div>
        <div class="text-center"><b>Valor Total</b></div>
        <div class="text-center"><b>Detalhes</b></div>
      </div>
      <div class="my-table" v-for="(order, index) in myOrders.data" :key="index">
        <div class="text-center">{{order.identify}}</div>
        <div class="text-center">{{order.date}}</div>
        <div class="text-center">{{order.status}}</div>
        <div class="text-center">R$: {{order.total}}</div>
        <router-link :to="{ name: 'detail.order', params:{ identify:order.identify }}" class="btn btn-danger">Detalhes</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  mapActions,
  mapState
} from 'vuex'

export default {
  created() {
    if (!this.authenticated)
      return this.$router.push({name: 'home'})

    this.getMyOrders()
      .catch(error => this.$vToastify.error("Erro ao carregar os pedidos."))
  },

  computed: {
    ...mapState({
      myOrders: state => state.orders.myOrders,
      me: state => state.auth.me,
      authenticated: state => state.auth.authenticated
    })
  },

  methods: {
    ...mapActions([
      'getMyOrders'
    ])
  },
}
</script>
