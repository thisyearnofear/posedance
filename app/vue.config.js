module.exports = {
  publicPath: "",
  configureWebpack: {
    devtool: "source-map",
    output: {
      filename: "js/[name].[contenthash].js",
      chunkFilename: "js/[name].[contenthash].js",
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/sass/styles.scss";`,
      },
    },
    extract: {
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
    },
  },
};
