// 全局功能函数
import { App } from 'vue'
import { init as initAntd} from './antd/index'
import { init as complexInit } from './complex/index'

export const init = function(app: App): App {
  return complexInit(initAntd(app))
}