import { createApp } from 'vue'
//样式
import 'normalize.css'
import './assets/css/index.less'

import App from './App.vue'
import router from './router'
import store from './stores'
//注册全局icon
import icons from './global/register-icons'

const app = createApp(App)

app.use(icons)
app.use(store)
app.use(router)
app.mount('#app')
