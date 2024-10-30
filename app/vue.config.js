module.exports = {
  publicPath: "/",
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
    extract: {
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
    },
  },
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].minify = {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: false,
      };
      return args;
    });
  },
};
