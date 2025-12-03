// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Song Learning Tracker frontend',
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo2.webp' }
      ]
    }
  },
  srcDir: 'src/', 
  modules: [
    "@nuxtjs/supabase"
  ],
  supabase: {
    redirect: false
  },
  compatibilityDate: '2025-11-01'
})
