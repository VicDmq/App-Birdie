const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const cleanPlugin = new CleanWebpackPlugin(["build"]);

const htmlPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, "src/client/public/index.html"),
  filename: "index.html"
});

const miniCssPlugin = new MiniCssExtractPlugin({
  filename: "./css/[name].[hash].css",
  chunkFilename: "[id].[hash].css"
});

const config = {
  entry: path.resolve(__dirname, "src/client/index.js"),
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "./js/bundle.[hash].js"
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
    open: true
  },
  plugins: [cleanPlugin, htmlPlugin, miniCssPlugin]
};

module.exports = config;
