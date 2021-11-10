import { createApp } from 'vue'
import './style/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import route from './route/index'
import store from './store/index'


createApp(App).use(ElementPlus).use(route).use(store).mount('#app')
