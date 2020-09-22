<template>
<div>
  <!-- login -->
  <div class="d-flex justify-content-center h-100 my-5">
    <div class="user_card">

      <logo-component />

      <div class="d-flex justify-content-center form_container">
        <form>

          <div class="text-danger" v-if="errors.name != ''">
            {{errors.name[0] || ''}}
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fa fa-user"></i></span>
            </div>
            <input type="text" v-model="formData.name" name="name" :class="['form-control', 'input_user', {'is-invalid' : errors.name != ''}]" value="" placeholder="Nome">
          </div>

          <div class="text-danger" v-if="errors.email != ''">
            {{errors.email[0] || ''}}
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fa fa-envelope"></i></span>
            </div>
            <input type="email" v-model="formData.email" name="email" :class="['form-control', 'input_user', {'is-invalid' : errors.email != ''}]" value="" placeholder="E-mail">
          </div>

          <div class="text-danger" v-if="errors.password != ''">
            {{errors.password[0] || ''}}
          </div>
          <div class="input-group">
            <div class="input-group-append">
              <span class="input-group-text"><i class="fa fa-key"></i></span>
            </div>
            <input type="password" v-model="formData.password" name="password" :class="['form-control', 'input_user', {'is-invalid' : errors.password != ''}]" value="" placeholder="Senha">
          </div>
          <div class="d-flex justify-content-center login_container">
            <button type="button" name="button" class="btn login_btn" @click.prevent="registerClient()" :disabled="loading">
              <span v-if="loading">Cadastrando...</span>
              <span v-else>Cadastrar</span></button>
          </div>
        </form>
      </div>

      <div class="mt-4">
        <div class="d-flex justify-content-center links">
          Já tem conta? <router-link :to="{name: 'login'}" class="ml-2">Login</router-link>
        </div>
      </div>
    </div>
  </div>
  <!-- login-->
</div>
</template>

<script>
import LogoComponent from '../../layouts/_partials/logo'
import {
  mapActions
} from 'vuex'

export default {
  components: LogoComponent,

  data() {
    return {
      loading: false,
      formData: {
        name: '',
        email: '',
        password: ''
      },
      errors: {
        name: [],
        email: [],
        password: [],
      }
    }
  },

  methods: {
    ...mapActions([
      'register'
    ]),

    registerClient() {
      this.loading = true

      this.resetErrors()

      this.register(this.formData)
        .then(response => {
          this.resetForm()

          this.$router.push({
            name: 'login'
          })

          this.$vToastify.success("Cadastrado com sucesso", 'Parabéns')

        })
        .catch(error => {
          const errorResponse = error.response

          if (errorResponse.status === 422) {
            this.errors = Object.assign(this.errors, errorResponse.data.errors)

            this.$vToastify.error("Dados inválidos, verifique novamente", 'Erro')

            setTimeout(() => this.resetErrors(), 4000)

            return;
          }
          this.$vToastify.error("Erro ao registrar.", 'Erro')

        })
        .finally(() => this.loading = false)
    },

    resetForm() {
      this.formData = {
        name: '',
        email: '',
        password: ''
      }
    },

    resetErrors() {
      this.errors = {
        name: [],
        email: [],
        password: [],
      }
    }
  },
}
</script>
