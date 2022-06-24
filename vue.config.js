const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          // modifyVars: {
          //   hack: `true; @import "~@main/style/index.less";`
          // }
          javascriptEnabled: true
        },
        // additionalData: '@import "~@main/style/index.less";'
      }
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias.set('@main', resolve('src/main'))
  },
})
