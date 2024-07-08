import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import store from './store/store'

createApp(App).use(store).mount('#app')
