import Antd from 'ant-design-vue';
import '~ant-design-vue/dist/antd.less';

export const init = function(app: any) {
  return app.use(Antd)
}
