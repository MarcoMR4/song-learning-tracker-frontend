import { defineNuxtPlugin } from '#app'
import {
  Quasar,
  QBtn,
  QTable,
  QIcon,
  Notify,
  Dialog
} from 'quasar'

import 'quasar/dist/quasar.css'
import '@quasar/extras/material-icons/material-icons.css'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(Quasar, {
    components: {
      QBtn,
      QTable,
      QIcon
    },
    plugins: {
      Notify,
      Dialog
    }
  })
})
