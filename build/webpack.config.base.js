const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const happypack = require("happypack");
const os = require("os");
const happyThreadPool = happypack.ThreadPool({ size: os.cpus().length });
const MiniExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const chalk = require("chalk");
const webpack = require("webpack");

function resolve(dir) {
  return path.resolve(__dirname, "../", dir);
}

let htmlPlugin = [
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: resolve("public/index.html"),
    favicon: resolve("public/favicon.ico"),
  })
];

module.exports = {
  entry: {
    app: ['@babel/polyfill',resolve("src/main.js")],
  },
  output: {
    path: resolve("dist"),
    filename: "js/[name].bundle.[hash:8].js",
    chunkFilename: "js/[name].chunk.[hash:8].js",
    publicPath: process.env.NOED_ENV === "production" ? "./" : "/",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: "vue-loader",
            options: {},
          },
        ],
      },
      {
        test: /\.js$/,
        use: [
          {
            loader: "happypack/loader?id=happyBable",
          },
        ],
        include:[
           resolve('src'),
           resolve('test'),
        　 resolve('node_modules/weback-dev-server/client'),
        　 resolve('node_modules/element-ui/packages'),
           resolve('node_modules/element-ui/src'),
           resolve('node_modules/qiankun'),
           resolve('node_modules/import-html-entry'),
           resolve('node_modules/@babel/runtime/helpers/esm/*'),

        ]
        // exclude: [/node_modules/, resolve("static")],
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniExtractPlugin.loader,
            options: {
              sourceMap: true,
              publicPath: "../",
            },
          },
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /\.svg$/,
        use: {
          loader: "svg-sprite-loader",
          options: {
            symbolId: "icon-[name]",
          },
        },
        include: [resolve("src/icons")],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              limit: 10000,
              name: "image/[name].[hash:7].[ext]",
              esModule: false
            },
          },
        ],
        exclude:[resolve("src/icons")]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "media/[name].[hash:7].[ext]",
        },
      },
      {
        test: /\.(woff2?|woff|truetype|eot|embedded-opentype|ttf|TTF|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "fonts/[name].[hash:7].[ext]",
          publicPath: "../",
        },
      },
    ],
  },
  plugins: [
    ...htmlPlugin,
    new VueLoaderPlugin(),
    // new CleanWebpackPlugin(),
    new happypack({
      id: "happyBable",
      loaders: [
        {
          loader: "babel-loader?cacheDirectory=true",
        },
      ],
      threadPool: happyThreadPool,
      verbose: true,
    }),
    new MiniExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].chunk.[contenthash:8].css",
    }),
    new ProgressBarPlugin({
      format:
        "  build [:bar] " +
        chalk.green.bold(":percent") +
        " (:elapsed seconds)",
      clear: false,
    }),
    new webpack.DefinePlugin({
      "process.env.BASE_URL": "''",
    }),
  ],
  resolve: {
    extensions: [".vue", ".js", ".less", ".css", ".scss", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@": resolve("src"),
      "@static": resolve("static"),
    },
  },
};
