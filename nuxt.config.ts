// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["./app/assets/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxtjs/supabase", "@pinia/nuxt", "@nuxt/fonts"],
  fonts: {
    families: [{ name: "Lexend", provider: "google" }],
  },
});
