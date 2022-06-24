import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/themify/themify.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import { createPinia } from "pinia";

import router from "./router";
import FullCenter from "./components/FullCenter.vue";

const app = createApp(App);
app.use(Quasar).use(router).use(createPinia()).mount("#app");
app.component("full-center", FullCenter);
