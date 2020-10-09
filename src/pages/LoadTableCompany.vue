<template>
  <div>
    <p>Empresa: {{token_company}}</p>
    <p>Mesa: {{token_table}}</p>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  props: [
    'token_company',
    'token_table'
  ],

  computed: {
    ...mapState({
      company: state => state.companies.companySelected,
    })
  },

  created() {
    this.getCompanyByToken(this.token_company)
            .then(response => {
              const params = {table: this.token_table, token_company: this.token_company}

              this.getTableFromToken(params)
                .then(response => this.$vToastify.success("Loja carregada com sucesso!"))
                .catch(error => this.$vToastify.error("Não conseguimos acesso pelo token!"))
                .finally(() => this.$router.push({name: 'products', params:{companyFlag: this.company.flag}}))
            })
            .catch(error => {
              this.$vToastify.error("Não conseguimos acesso pelo token.")

              this.$router.push({name: 'home'})
            })
  },

  methods: {
    ...mapActions([
      'getCompanyByToken', 
      'getTableFromToken'
    ])
  },
}
</script>