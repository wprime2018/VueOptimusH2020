<template>
  <div>
    <div class="container container-body">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

  import 'bootstrap' 
  import 'bootstrap/dist/css/bootstrap.min.css' 
  import LogoComponent from '../layouts/_partials/logo'

  export default {
    components: LogoComponent
    
  }
</script>

<style scoped>
  @import url('../assets/css/auth.css');
  @import url('../assets/css/reset.css');
  @import url('https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

</style>