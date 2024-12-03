import { createApp } from 'vue'
import App from './App.vue'
import './assets/app.css'
import router from './router'
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/tailwind-light/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import Menu from 'primevue/menu';
import Tooltip from 'primevue/tooltip';
import Card from 'primevue/card';


const app = createApp(App);

app.component('InputText', InputText);
app.component('xAvatar', Avatar);
app.component('xMenu', Menu);
app.component('xCard', Card);
app.directive('tooltip', Tooltip);
app.use(router);
app.use(PrimeVue);


app.mount('#app')
