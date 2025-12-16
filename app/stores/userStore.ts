import { defineStore } from "pinia";
import type { AppTypes } from "../types/app";

export const useUserStore = defineStore("useUserStore", () => {
  const user = useSupabaseUser();

  return { user };
});
