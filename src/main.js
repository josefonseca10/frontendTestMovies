import { createApp } from 'vue'
import App from './App.vue';
import router from "@/router";
import store from "@/store/store";
import Notifications from '@kyvg/vue3-notification';
import VueStarRating from "@babel/core/lib/parser";

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Notifications);
app.component('star-rating', VueStarRating.default)
app.mount('#app');

