import { App } from 'vue'
import { componentInit } from './component'
import { funcInit } from './func'
import require from './require'

export const init = function(app: App) {
  componentInit(app)
  return funcInit(app)
}
