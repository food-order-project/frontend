import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pinia from "./stores";
import i18n from "./i18n";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
});

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(i18n);
app.use(vuetify);

app.mount("#app");
