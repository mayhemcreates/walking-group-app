import { defineStore } from "pinia";
import { createClient } from "@supabase/supabase-js";
import type { AppTypes } from "../types/app";

export const useUserStore = defineStore("useUserStore", async () => {
  let users = ref<AppTypes.walk[]>([]);

});
