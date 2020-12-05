import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'


import './assets/iconfont/iconfont.js'
import './assets/iconfont/icon.css'
//import 'ant-design-vue/dist/antd.css';
//import {Button , Affix} from 'ant-design-vue'
import { Button, Select,Menu,Submenu,MenuItem,Option,Carousel,CarouselItem,Table,Backtop,Radio,RadioButton,RadioGroup,MenuItemGroup,Pagination,Tabs,TabPane,Slider } from 'element-ui';


Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
Vue.use(VueAxios, axios);

Vue.use(Button);
Vue.use(Select);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Option);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Table);
Vue.use(Backtop);
Vue.use(Radio);
Vue.use(RadioButton);
Vue.use(RadioGroup);
Vue.use(MenuItemGroup);
Vue.use(Pagination);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Slider);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
