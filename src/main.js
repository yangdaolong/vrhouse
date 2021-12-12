import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app
  .use(store)
  .use(router)
  .mount("#app");

import * as utils from "./utils/index";

Object.keys(utils).forEach(key => {
  app.config.globalProperties[key] = utils[key];
});

app.directive("func", {
  updated(el, binding, vnode) {
    // binding.value 是我们传递给指令的值——在这里是 200

    let str = JSON.stringify(store.state.func);
    let arr = (binding.value + "").split(",");
    // console.log("arr:", arr, str);
    let b = true;

    arr.forEach(el => {
      let index = str.indexOf(el);
      if (index > -1) {
        b = false;
      }
    });
    // if (binding.value == "100200050004" || binding.value == "10030004") {
    //   console.log(el, vnode);
    //   console.log("b:", b, el.parentNode);
    // }

    if (b && el.parentNode) {
      el.parentNode.removeChild(el);
      // el.style.display = "none";
    } else {
      // el.style.display = "";
    }
  }
});

export default app;
