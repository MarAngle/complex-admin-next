import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import { App } from 'vue';

export const init = function(app: App) {
  return app.use(Antd)
}
