import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import Cookies from "js-cookie";

// createApp(App).use(router).mount("#app");
const app = createApp(App);
app.use(router).mount("#app");
app.config.globalProperties.$cookies = Cookies; // 全局挂载
