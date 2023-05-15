const { defineConfig } = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
module.exports = defineConfig({
  transpileDependencies: true,
    // 全局 设置css的主入口文件
    css: {
      loaderOptions: {
        scss: { 
          additionalData: `@import "./src/style/main.scss";`
        }
      }
    },
    // 按需引入elementplus  参照官网自动引入模式
    configureWebpack:{
      plugins: [
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ],
    },
})
