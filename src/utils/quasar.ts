// src/utils/quasar.ts
import * as Quasar from 'quasar'

// Lista centralizada de componentes y plugins Quasar a usar en todo el proyecto
export const quasarComponents = [
  'QBtn',
  'QTable',
  'QIcon',
  'QInput',
  'QForm',
  'QCard',
  'QDialog',
  'QToolbar',
  'QSelect',
  'QToggle',
  'QSpinner',
  'QBadge',
  'QSeparator',
  'QLayout',
  'QHeader',
  'QFooter',
  'QPageContainer',
  'QCardSection',
  'QCardActions',
  'QImg',
  'QDrawer',
  'QList',
  'QItem',
  'QItemSection',
  'QSpace',
  'QBanner',
  'QTd',
  'QSpinner'
]

export const quasarPlugins = [
  'Notify',
  'Dialog',
  'Loading'
]

export const quasarDirectives = [
  'ClosePopup'
]

// Función auxiliar para cargar los objetos reales desde Quasar
export function loadQuasar(list: string[]) {
  const out: Record<string, any> = {}

  for (const name of list) {
    if (name in Quasar) {
      out[name] = (Quasar as any)[name]
    }
  }

  return out
}
