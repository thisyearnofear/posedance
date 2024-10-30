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
        additionalData: `
          $primary: #f9e54e;
          $base: #fbfef9;
          $info: #3ca8d6;
          $warning: #ff8646;
          $link: #ad8dcd;
          $dark: #191923;
          $family-primary: Geometry Soft Pro Bold N, sans-serif;
        `,
      },
    },
    extract: {
      filename: "css/[name].[contenthash].css",
      chunkFilename: "css/[name].[contenthash].css",
    },
  },
};
