import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import quasarLang from "quasar/lang/zh-TW";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/themify/themify.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import router from "./router";
createApp(App)
  .use(Quasar, {
    plugins: {}, // import Quasar plugins and add here
    lang: quasarLang,
  })
  .use(router)
  .mount("#app");
