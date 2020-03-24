import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './plugins/element.js'
import i18n from './i18n'
import vSelect from "vue-select";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.component("v-select", vSelect);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')