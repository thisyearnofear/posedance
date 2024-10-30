module.exports = {
  publicPath: "",
  configureWebpack: {
    devtool: "source-map",
    output: {
      filename: "[name].[hash].js",
      chunkFilename: "[name].[hash].js",
    },
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
