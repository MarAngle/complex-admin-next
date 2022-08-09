import { App } from 'vue'
import { componentInit } from './component'
import { dataInit } from './data'
import { funcInit } from './func'
import { requireInit } from './require'

export const init = function(app: App) {
  requireInit()
  dataInit()
  componentInit(app)
  return funcInit(app)
}
