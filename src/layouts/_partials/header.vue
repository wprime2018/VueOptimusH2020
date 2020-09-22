<template>
<div>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-vuefood">
      <div class="container">
        <router-link :to="{name: 'home'}" class="navbar-brand">
          <img src="@/assets/imgs/logo-vuefood.png" alt="VueFood" class="logo">
        </router-link>
        <div>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'products'}" class="nav-link">Produtos</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{name: 'cart'}" class="nav-link">Carrinho</router-link>
            </li>
            <li class="nav-item nav-cart active">
              <router-link :to="{name: 'cart' }" class="nav-link">
                <a href="carrinho.html"><i class="fa fa-shopping-cart"></i> ({{productsCart.length}})</a>
              </router-link>
            </li>
            <li class="nav-item">
              <a href="#" v-if="authenticated" class="nav-link">Olá {{me.name}}! (<span @click.prevent="logout">Sair</span>)</a>

              <router-link v-else :to="{name:'login'}" class="nav-link">Entrar</router-link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  </header>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
export default {
  computed: {
    ...mapState({
      productsCart: state => state.cart.products,
      me: state => state.auth.me,
      authenticated: state => state.auth.authenticated
    })
  },

  methods: {
    ...mapActions([
      'logout'
    ])
  }
}
</script>
