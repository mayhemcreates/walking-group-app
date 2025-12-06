import { defineStore } from "pinia";
import { reactive } from "vue";
import { AppTypes } from "../types/app";

const useWalkStore = defineStore("useWalkStore", () => {
  const walks: AppTypes.walks = reactive(walks:{});
});
