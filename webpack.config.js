const HtmlWebpackPlugin = require("html-webpack-plugin");

const port = process.env.PORT || 3000;

var config = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.[fullhash].js",
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: "url-loader",
        options: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
      favicon: "public/favicon.ico",
    }),
  ],
  devServer: {
    host: "localhost",
    port: port,
    historyApiFallback: true,
    open: true,
  },
};
var config = {
  entry: "./app.js",
  //...
};

module.exports = (env, argv) => {
  console.info("MODE:",env.NODE_ENV)
  if (argv.mode === "development") {
    config.devtool = "inline-source-map";
  }

  if (argv.mode === "production") {
    config.devtool = "source-map";
  }

  return config;
};
