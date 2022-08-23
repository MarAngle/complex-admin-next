import { App } from 'vue'
import { componentInit } from './component'
import { funcInit } from './func'
import { requireInit } from './require'

export const init = function(app: App) {
  requireInit()
  componentInit(app)
  return funcInit(app)
}
