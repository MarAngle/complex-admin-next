// 全局功能函数
import { init as initFunc } from './func/index'

import { init as initAntd} from './antd/index'
import { App } from 'vue'

export const init = function(app: App): any {
  return initFunc(initAntd(app))
}