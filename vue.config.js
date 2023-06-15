const path = require("path");
module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/static/" : "/",
  configureWebpack: {
    resolve: {
      alias: {
        "@Store": path.resolve(__dirname, "src/store"),
        "@Components": path.resolve(__dirname, "src/components"),
        "@": path.resolve(__dirname, "src/"),
        "@Pages": path.resolve(__dirname, "src/pages"),
      },
    },
  },
  pluginOptions: {
    quasar: {
      importStrategy: "kebab",
      rtlSupport: false,
    },
  },
  transpileDependencies: ["quasar"],
};
