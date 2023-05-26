const { defineConfig } = require('@vue/cli-service')
const path = require('path');
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  configureWebpack: {
    resolve: {
        symlinks:true
    },
    plugins: [
      new webpack.ProvidePlugin({
        "window.Quill": "quill/dist/quill.js",
        Quill: "quill/dist/quill.js"
      })
    ]
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
