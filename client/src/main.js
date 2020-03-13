import Vue from 'vue'
import App from './App.vue'
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '923246521733-0t9udeeh2m9jlsfpih50vigo504qa9b4.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

new Vue({ render: createElement => createElement(App) }).$mount('#app');