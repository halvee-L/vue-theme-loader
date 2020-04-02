const path = require("path");

const ExtractThemePlugin = require("./webpack/extract-theme-webpack-plugin/index");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  chainWebpack: config => {},
  configureWebpack: config => {
    if (isProduction) {
      config.plugins.push(
        new ExtractThemePlugin({
          filename: path.join("static", "css/app.[theme].css")
        })
      );
    }
  }
};
