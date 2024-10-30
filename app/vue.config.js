module.exports = {
  publicPath: "./",
  configureWebpack: {
    devtool: "source-map",
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7071",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};
