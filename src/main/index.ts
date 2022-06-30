// 全局功能函数
import { App } from 'vue'
import { init as initAntd} from './antd/index'
import { init as initFunc } from './func/index'

export const init = function(app: App): App {
  return initFunc(initAntd(app))
}