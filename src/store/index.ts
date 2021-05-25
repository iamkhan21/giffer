import { createStore } from "vuex";
import editor from "./editor";

export default createStore({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    editor,
  },
});
