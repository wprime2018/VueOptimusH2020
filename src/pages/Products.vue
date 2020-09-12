<template>
<div class="row">
  <h1 class="my-4 title-tenant text-center">{{company.name}}</h1>
  <div class="row">
    <!-- List Categories -->
    <div class="list-categories">
      <a href="#" class="list-categories__item active" v-for="(category, index) in categories.data" :key="index" @click.prevent="filterByCategory(category)">
        <div class="icon">
          <i class="fas fa-pizza-slice"></i>
        </div>
        <span> {{category.name}}</span>
      </a>
    </div>
    <!-- End List Categories -->
  </div>
  <!-- Cards Produtos -->

  <div class="row my-4">

    <div class="col-lg-4 col-md-6 mb-4" v-for="(products, index) in company.products.data" :key="index">
      <div class="card--flat h-100">
        <a href="#">
          <div class="card-image">
            <img class="card-img-top" :src="products.image" alt="">
          </div>
        </a>
        <div class="card-body">
          <h4 class="card-title">
            <a href="#">{{products.title}}</a>
          </h4>
          <h5>R$ {{products.preco}}</h5>
          <p class="card-text">{{products.description}}</p>
        </div>
        <div class="card-footer card-footer-custom">
          <router-link :to="{name: 'cart'}">Adicionar no Carrinho <i class="fa fa-cart-plus"></i></router-link>
        </div>
      </div>
    </div>

  </div>
  <!-- /.row -->
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'
import logoVue from '../layouts/_partials/logo.vue'
import LoginVue from './Auth/Login.vue'

export default {
  props: ['companyFlag'],

  data() {
    return {
      filters: {
        category: ''
      }
    }
  },

  created() {
    if (this.company.name === '') {
      return this.$router.push({
        name: 'home'
      })
    }
    this.getCategoriesByCompany(this.company.id)
      .catch(response => this.$vToastify.error("Não conseguimos recuperar as categorias."))

    this.loadProducts()
  },

  computed: {
    ...mapState({
      company: state => state.companies.companySelected,
      categories: state => state.companies.categoriesCompanySelected,
      products: state => state.companies.productsCompanySelected,
    })
  },

  methods: {
    ...mapActions([
      'getCategoriesByCompany',
      'getProductsByCompany'
    ]),

    loadProducts() {

      const params = {
        token_company: this.company.id,
      }

      if (this.filters.category != '') {
        params.categories = [
          this.filters.category
        ]
      }

      this.getProductsByCompany(params)
        .catch(response => this.$vToastify.error("Não conseguimos recuperar os produtos."))

    },

    filterByCategory(category) {
      this.filters.category = category.identify

      this.loadProducts()
    }
  },
}
</script>
