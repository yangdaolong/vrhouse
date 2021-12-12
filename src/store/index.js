import { createStore } from "vuex";

export default createStore({
  state: {
    user: "",
    func: []
  },
  mutations: {
    setUser(state, val) {
      state.user = val;
    },
    setFunc(state, val) {
      state.func = val;
    }
  },
  actions: {},
  modules: {}
});
