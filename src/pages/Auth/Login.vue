<template>
<div>
  <!-- login -->
  <div class="d-flex justify-content-center h-100 my-5">
    <div class="user_card">
      <div class="d-flex justify-content-center">
        <logo-component></logo-component>
      </div>
      <div class="d-flex justify-content-center form_container">
        <form @submit.prevent="loginClient()">
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

          <div class="d-flex justify-content-center mt-3 login_container">
            <button type="submit" name="button" class="btn login_btn" :disabled="loading">
              <span v-if="loading">Entrando...</span>
              <span v-else>Entrar</span>
            </button>
          </div>
        </form>
      </div>

      <div class="mt-4">
        <div class="d-flex justify-content-center links">
          Não tem uma conta? <router-link :to="{name: 'register'}" class="ml-2">Cadastre-se!</router-link>
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

  computed: {
    deviceName() {
      return navigator.appCodeName + navigator.appName + navigator.platform + this.formData.email
    }
  },

  data() {
    return {
      loading: false,
      formData: {
        email: '',
        password: ''
      },
      errors: {
        email: [],
        password: [],
      }
    }
  },

  methods: {
    ...mapActions([
      'login'
    ]),

    loginClient() {
      this.loading = true

      this.resetErrors()

      const params = {
        device_name: this.deviceName,
        ...this.formData
      }

      this.login(params)
        .then(response => {
          this.resetForm()

          this.$router.push({
            name: 'home'
          })

          this.$vToastify.success("Autenticado com sucesso", 'Parabéns')

        })
        .catch(error => {
          const errorResponse = error.response

          if (errorResponse.status === 422) {
            this.errors = Object.assign(this.errors, errorResponse.data.errors)

            this.$vToastify.error("Dados inválidos, verifique novamente", 'Erro')

            setTimeout(() => this.resetErrors(), 4000)

            return;
          }
          this.$vToastify.error("Erro ao logar", 'Erro')

        })
        .finally(() => this.loading = false)
    },

    resetForm() {
      this.formData = {
        email: '',
        password: ''
      }
    },

    resetErrors() {
      this.errors = {
        email: [],
        password: [],
      }
    }
  },
}
</script>
