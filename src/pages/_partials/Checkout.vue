<template>
  <div>
    <div class="cart-price text-red">
      Preço Total: <b>R$ {{totalCart}}</b>
    </div>
    <hr>
    <a href="" class="cart-finalizar" @click.prevent="openModalCheckout">Finalizar</a>

    <modal name="checkout">
    <div class="px-md-5 my-4" v-if="loading">
      <p>Gerando pedido... Por favor aguarde...</p>
    </div>
      <div class="px-md-5 my-4" v-else>
        <div class="col-12" v-if="me.name !== ''">
          <p> <strong>Total de Produtos:</strong> {{products.length}}</p>
          <p> <strong>Total do pedido:</strong> R$ {{totalCart}}</p>
          <div class="form-group">
            <textarea name="comment" v-model="comment" class="form-control" cols="30" rows="3" placeholder="Comentário"></textarea>
          </div>
          <button class="btn btn-success" @click.prevent="storeOrder">Fazer Pedido</button>
        </div>
        <div v-else class="row">
          <div class="col-6">
            <p> <strong>Total de Produtos:</strong> {{products.length}}</p>
            <p> <strong>Total do pedido:</strong> R$ {{totalCart}}</p>
            <div class="form-group">
              <textarea name="comment" v-model="comment" class="form-control" cols="30" rows="3" placeholder="Comentário"></textarea>
            </div>
            <button class="btn btn-info btn-full" @click.prevent="storeOrder">Fazer pedido como anônimo</button>
          </div>
          <div class="col-6">
            <router-link :to="{name: 'login'}" class="btn btn-default btn-full">Fazer Login</router-link>
          </div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import logoVue from '../../layouts/_partials/logo.vue'

export default {
  computed: {
    ...mapState({
      me: (state) => state.auth.me,
      authenticated: (state) => state.auth.authenticated,
      products: state => state.cart.products,
      company: state => state.companies.companySelected,
    }),

    totalCart() {
      let total = 0

      this.products.map((itemCart, index) => {
        total += itemCart.qty * itemCart.product.preco
      })

      return total
    },

  },

  data() {
    return {
      comment: '',
      loading: false,

    }
  },

  methods: {
    ...mapActions([
      'createOrder',
      'createOrderAuthenticated'
    ]),

    storeOrder() {
      this.loading = true
      //const action = this.authenticated ? 'createOrder' : 'createOrderAuthenticated'

      let params = {
        token_company: this.company.id,
        comment: this.comment,
        products: [...this.products],

      }

      //this.$store.dispatch(action, params)
      this.$store.dispatch('createOrderAuthenticated', params)
            .then(response => {
                this.$vToastify.success("Pedido gerado com sucesso!", 'Parabéns')
                
                this.closeModalCheckout()

                this.$router.push({name: 'myorders'})
            })
            .catch(error => {
              console.log(error)
              this.$vToastify.error("Dados inválidos, verifique novamente", 'Erro')
            })
            .finally(this.loading = false)
    },

    openModalCheckout() {
      this.$modal.show('checkout')
    },

    closeModalCheckout() {
      this.$modal.hide('checkout')
    }
  },
}
</script>