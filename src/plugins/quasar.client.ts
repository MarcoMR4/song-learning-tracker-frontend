import { defineNuxtPlugin } from '#app'
import { Quasar } from 'quasar'
import { quasarComponents, quasarPlugins, loadQuasar } from '~/utils/quasar'

// Estilos globales
import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    components: loadQuasar(quasarComponents),
    plugins: loadQuasar(quasarPlugins)
  })
})
