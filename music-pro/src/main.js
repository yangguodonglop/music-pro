
import Vue from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css';
import './assets/reset.scss' 
import qs from 'qs';
Vue.prototype.$qs = qs
Vue.config.productionTip = false;

Vue.use(Antd);
import router from './router'



new Vue({
  render: h => h(App),
  router
}).$mount('#app')
