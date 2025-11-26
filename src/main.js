/** Template CSS */
import './assets/css/variables.css'
import './assets/vendor/css/all.min.css'
import './assets/vendor/css/sharp-solid.min.css'
import './assets/vendor/css/sharp-regular.min.css'
import './assets/vendor/css/jquery-ui.min.css'
import './assets/vendor/css/OverlayScrollbars.min.css'
import 'bootstrap/dist/css/bootstrap.min.css' // Bootstrap dari npm
import 'bootstrap/dist/js/bootstrap.bundle.min.js' // Bootstrap JS
import './assets/css/style.css'
import './assets/css/custom.css'
import './assets/css/gold-color.css'

/** Template Images */
import './assets/images/logo-rrfx3.png'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')
