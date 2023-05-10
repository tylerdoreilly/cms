const { defineConfig } = require('@vue/cli-service')
const path = require('path');

module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  configureWebpack: {
    resolve: {
        symlinks:true
    },
},
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/_variables.scss"; @import "@/styles/_mixins.scss";`
      }
    }
  },
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3080',
        secure:false,
        changeOrigin: false
      },
    }
  }
}
