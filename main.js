import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// PrimeVue
import PrimeVue from 'primevue/config'
import 'primevue/resources/themes/saga-blue/theme.css'   // ou outro tema
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// Tailwind
import './index.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue)

app.mount('#app')
