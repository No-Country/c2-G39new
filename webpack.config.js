var path = require("path");
//var webpack = require("webpack")
var BundleTracker = require("webpack-bundle-tracker");

module.exports = {
  mode: "development",
  context: __dirname,

  entry: "./assets/src/index.js",

  output: {
    path: path.resolve("./assets/bundles/"),
    filename: "[name]-[hash].js",
  },

  plugins: [new BundleTracker({ filename: "./django_react_demo/webpack-stats.json" })],

  module: {
    rules: [
      { test: /\.js?$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
      { test: /\.css$/i, loader: "css-loader", options: {url: true, import: true}}
    ],
  },
};
