// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: 'src/', 
  modules: [
    "@nuxtjs/supabase"
  ],
  supabase: {
    redirect: false
  },
  compatibilityDate: '2025-11-01'
})
