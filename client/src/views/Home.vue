<template>
  <div class="home">
    <div class="loading-spinner-wrapper d-flex justify-content-center align-items-center" v-if="loading">
      <LoadingSpinner/>
    </div>
    <LeanCanvas v-else msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
  import axios from 'axios';
  // @ is an alias to /src
  import LeanCanvas from '@/components/LeanCanvas.vue'
  import setAuthToken from "../utils/setAuthToken";
  import LoadingSpinner from "../components/LoadingSpinner";

  export default {
    name: 'Home',
    components: {LoadingSpinner, LeanCanvas},
    data() {
      return {
        loading: true
      }
    },
    mounted() {
      document.title = "Nova6 - Lean Canvas";

      if (!localStorage.getItem('token')) {
        return this.$router.push({name: "Login"});
      } else {
        let token = localStorage.getItem('token');
        setAuthToken(token);

        axios.get('/api/auth/user')
          .then(res => {
            // change Vuex state
            this.$store.commit('setUser', {user: res.data});

            this.loading = false;
          })
          .catch(err => {
            if (err.response.status === 401) {
              localStorage.removeItem('token');

              return this.$router.push({name: "Login"});
            }
          });
      }
    }
  }
</script>

<style lang="scss">
  @import "../assets/styles/variables.scss";

  .home {
    min-height: 100vh;
    background-color: $bg-color;
  }

  .loading-spinner-wrapper {
    min-height: 100vh;
    width: 100%;
  }
</style>
