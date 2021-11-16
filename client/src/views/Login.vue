<template>
  <div class="login d-flex justify-content-center align-items-center">
    <b-card no-body>
      <b-card-header>
        <h3>Login Form</h3>
      </b-card-header>
      <b-card-body>
        <b-form>
          <b-form-input
              class="mb-4"
              type="text"
              autocomplete="username"
              placeholder="Username ..."
              v-model="username"/>
          <b-form-input
              class="mb-4"
              type="password"
              autocomplete="current-password"
              placeholder="Password ..."
              v-model="password"/>
          <b-button
              variant="primary"
              block
              @click="login"
              :disabled="loading"
          >
            <span v-if="!loading">Login</span>
            <span v-else>Loading ...</span>
          </b-button>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import axios from 'axios';
  import setAuthToken from "../utils/setAuthToken";

  export default {
    name: "Login",
    data() {
      return {
        username: '',
        password: '',
        loading: false
      }
    },
    mounted() {
      document.title = "Login Form - Nova6 - Lean Canvas";
    },
    methods: {
      /**
       * handle login
       *
       * @return {void}
       */
      login() {
        this.loading = true;

        axios.post('/api/auth/login', {username: this.username, password: this.password})
          .then(res => {
            if (res.data.success) {
              this.$toasted.show('Logined Successfully!', {
                position: 'top-left',
                duration: 2000,
                type: 'success'
              });

              // save and set Token
              let token = res.data.token;
              localStorage.setItem('token', token);
              setAuthToken(token);

              // change Vuex state and route
              this.$store.commit('setUser', {user: res.data.user});
              this.$router.push({name: "Home"});
            } else {
              this.$toasted.show('error in login', {
                position: 'top-right',
                duration: 2000,
                type: 'error'
              });
            }

            this.loading = false;
          })
          .catch(err => {
            this.$toasted.show('error in login', {
              position: 'top-right',
              duration: 2000,
              type: 'error'
            });

            this.loading = false;
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables.scss';

  .login {
    min-height: 100vh;
    background-color: $bg-color;

    .card {
      min-width: 400px;
    }
  }
</style>
