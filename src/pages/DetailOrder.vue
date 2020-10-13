<template>
  <div>
    <div class="row my-4 mx-0 details">
      <div class="col-12 mb-2">
        <h1 class="title-tenant h2">
          Detalhes do Pedido <strong>dasfdsafda</strong>
        </h1>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li><b>Número:</b> {{ identify }}</li>
          <li><b>Total:</b> R$ {{ order.total | formatprice}}</li>
          <li><b>Data:</b>{{ order.date }}</li>
          <li>
            <b>Status:</b>
            <span class="badge bg-success text-light p-2">{{
              order.status
            }}</span>
          </li>
        </ul>
      </div>
      <div class="col-sm-6">
        <ul class="p-0">
          <li v-if="order.table.length != 0">
            <span>Canal de atendimento</span>
            <ul class="p-0">
              <li><b>Canal :</b> {{ order.table.description }}</li>
              <li><b>Descrição:</b> {{ order.table.zona }}</li>
            </ul>
          </li>
          <li>
            <span>Cliente</span>
            <ul class="p-0">
              <li><b>Nome:</b> {{ order.client.name }}</li>
              <li><b>E-mail:</b> {{ order.client.email }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- details order -->

    <hr />

    <div class="row my-4">
      <div class="col-12">
        <h4>Produtos</h4>
      </div>

      <div
        class="col-12 col-md-6 col-lg-4 my-1"
        v-for="(product, index) in order.products"
        :key="index"
      >
        <div class="details-card">
          <a href="vitrine-tenant.html"
            ><img class="card-img-top" :src="product.image" alt=""
          /></a>
          <div class="details-card-body">
            <h5>{{ product.title }}</h5>
            <h3>R$: {{ product.preco | formatprice}}</h3> 
          </div>
        </div>
      </div>
    </div>
    <!-- products order -->

    <hr />
    <!--Evaluation order-->


    <div>
      <button class="btn btn-info" 
        @click.prevent="openModalEvaluation()" 
        v-if="this.me.name != '' && this.me.name === this.order.client.name && this.order.evaluations.length">Avaliar o pedido
      </button>
    </div>

    <hr/>

    <modal name="evaluation-order" :height="350">
      <div class="px-md-5 my-4">
        
        <h1>  Avaliar o pedido {{identify}}</h1>

          <div class="form-group">
            <vue-stars
            name="evaluation"
            :active-color="'#3a9b49'"
            :inactive-color="'#999999'"
            :shadow-color="'#d22a4c'"
            :hover-color="'#dddd00'"
            :max="5"
            :value="3"
            :readonly="false"
            :char="'★'"
            :inactive-char="''"
            :class="''"
            v-model="evaluation.stars"
          />
        </div>
        
        <div class="form-group">
          <textarea class="form-control" name="comment" id="" cols="30" rows="3" v-model="evaluation.comment" placeholder="Comentário (opcional)"></textarea>
        </div>

        <div class="row">
          <button class="btn btn-info" @click.prevent="sendEvaluation()" :disabled="loadSendEvaluation">
            <span v-if="loadSendEvaluation">Enviando...</span>
            <span v-else>Confirmar</span>
          </button>
          <button class="btn btn-danger" @click.prevent="closeModalEvaluation()">Voltar</button>
        </div>
      
      </div>
    </modal>

    <div class="evaluations-order col-12" v-if="order.evaluations.length">
      <div v-for="(evaluation, index) in order.evaluations" :key="index">
        <p><strong>Comentário:</strong> {{evaluation.comment}}</p>
        <p><strong>Nota:</strong>             
          <vue-stars
            name="evaluation-user"
            :active-color="'#3a9b49'"
            :inactive-color="'#999999'"
            :shadow-color="'#d22a4c'"
            :hover-color="'#dddd00'"
            :readonly="true"
            :char="'★'"
            :inactive-char="''"
            :class="''"
            :value="evaluation.stars"
          />
        </p>
        <hr>
      </div>

    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  props: ["identify"],

  created() {
    if (!this.authenticated) return this.$router.push({ name: "home" });

    this.getOrderByIdentify(this.identify)
      .then((response) => {
        this.order = response.data.data;
      })
      .catch((error) => {
        this.$vToastify.error("Erro ao carregar o pedido", "Erro");

        this.$router.push({ name: "home" });
      });
  },

  computed: {
    ...mapState({
      me: (state) => state.auth.me,
      authenticated: (state) => state.auth.authenticated,
    }),
  },
  data() {
    return {
      order: {},
      evaluation: {
        step: 'customer service',
        stars: 3,
        comment: ''
      },
      loadSendEvaluation: false,
    };
  },

  methods: {
    ...mapActions(["getOrderByIdentify", "evaluationOrder"]),
    

    openModalEvaluation() {
      this.$modal.show('evaluation-order')
    },

    closeModalEvaluation() {
      this.evaluation =  {
        step: 'customer service',
        stars: 3,
        comment: ''
      }
      this.$modal.hide('evaluation-order')
    },

    sendEvaluation() {
      this.loadSendEvaluation = true
      const params = {
        identify: this.identify,
        ...this.evaluation,

      }

      this.evaluationOrder(params)
        .then(response => {
            this.$vToastify.success("Avaliação gravada com sucesso!")
            this.order.evaluations.push(response.data.data)
            this.closeModalEvaluation()
          })
        .catch(error => {
          this.$vToastify.error("Erro ao gravar avaliação.")
          console.log(error)
        })
        .finally(() => this.loadSendEvaluation = false)
    }
  },
};
</script>
