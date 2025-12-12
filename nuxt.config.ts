// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: 'Song Learning Tracker frontend',
      link: [
        { rel: 'icon', type: 'image/png', href: '/images/logo1.webp' }
      ]
    }
  },

  ssr: false,

  srcDir: 'src/', 

  modules: [
    '@nuxtjs/supabase',
    '@pinia/nuxt',
  ],
  
  supabase: {
    redirect: false,
    clientOptions: {
      auth: {
        flowType: 'pkce',
        autoRefreshToken: true,
        detectSessionInUrl: true,
        persistSession: true,
      }
    }
  },

  compatibilityDate: '2025-11-01',

  css: [
    'quasar/dist/quasar.css',
    '@quasar/extras/material-icons/material-icons.css',
    '~/assets/css/quasar-theme.css',
    '~/assets/css/login.css'
  ],

  build: {
    transpile: ['quasar']
  },

})