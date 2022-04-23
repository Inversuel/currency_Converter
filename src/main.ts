import { createApp } from "vue";
import App from "./App.vue";
import store from "./store"
import PrimeVue from 'primevue/config'

import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';

import 'primevue/resources/themes/saga-blue/theme.css'       
import 'primevue/resources/primevue.min.css'           
import 'primeicons/primeicons.css'


const app = createApp(App);

app.use(PrimeVue);

app.component('Dropdown', Dropdown);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Checkbox', Checkbox);

app.use(store);
app.mount('#app');


