const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
      "/res": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
      "/static": {
        target: "http://127.0.0.1:7001",
        changeOrigin: true,
      },
    },
    // before: require('./mock/mock-server.js')
  },
});
