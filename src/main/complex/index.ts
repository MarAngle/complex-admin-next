import { App } from 'vue'
import { funcInit } from './func'
import require from './require'

export const init = function(app: App) {
  return funcInit(app)
}
