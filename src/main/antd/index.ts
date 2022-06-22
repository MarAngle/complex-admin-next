import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';

export const init = function(app) {
  return app.use(Antd)
}
