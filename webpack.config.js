const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BUILD_DIR = path.resolve(__dirname, "build");
const CLIENT_DIR = path.resolve(__dirname, "src/client");
const PUBLIC_INDEX_DIR = path.resolve("","src/client/public/index.html");

const cleanPlugin = new CleanWebpackPlugin(["build"]);

const htmlPlugin = new HtmlWebpackPlugin({
  template: PUBLIC_INDEX_DIR,
  filename: "index.html"
});

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "./css/[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});

const config = {
  entry: CLIENT_DIR + "/index.js",
  output: {
    path: BUILD_DIR,
    filename: "./js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              module: true,
              importLoaders: 1,
              localIdentName: "[name]_[local]_[hash:base64:5]"
            }
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: {
      "/api": "http://localhost:8080"
    }
  },
  plugins: [cleanPlugin, htmlPlugin, miniCssPlugin]
};

module.exports = config;
