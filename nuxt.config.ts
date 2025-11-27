// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  app: {
      head: {
          title: 'Song learning tracker frontend',
          meta: [
              {
                  name: 'description',
                  content: 'Song learning tracker WebApp Client Made with Nuxt3 and VueJS 3.'
              }
          ],
          link: [
              {rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons'}
          ]
      },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  
  components: true,
  imports: {
    dirs: [
        // Scan top-level modules
        'composables',
        // ... or scan all modules within given directory
        'composables/**',
    ]
  },
  modules: ['nuxt-quasar-ui'],
  runtimeConfig: {
      public: {
        quasarBrand: {
            primary: '#1976D2',
            secondary: '#26A69A',
            accent: '#9C27B0',
            dark: '#1d1d1d',
            'dark-page': '#121212',
            positive: '#21BA45',
            negative: '#C10015',
            info: '#31CCEC',
            warning: '#F2C037'
        },
        supabaseUrl: process.env.SUPABASE_URL,
        supabaseAnonKey: process.env.SUPABASE_KEY,
      }
  },
  css: [
    '@/assets/styles/global.css',
  ],
})
