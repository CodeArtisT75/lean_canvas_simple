import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import Toasted from 'vue-toasted';

import './assets/styles/bootstrap.scss';

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// Toasted
Vue.use(Toasted, {
  theme: "toasted-primary",
  position: "top-center",
  iconPack: 'fontawesome'
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
