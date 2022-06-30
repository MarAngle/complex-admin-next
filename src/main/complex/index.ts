import { App } from 'vue'
import { funcInit } from './func'
import { requireInit } from './require'

export const init = function(app: App) {
  requireInit()
  return funcInit(app)
}
