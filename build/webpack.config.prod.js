const baseConfig = require('./webpack.config.base');
const webpackMerge = require('webpack-merge');
const path = require('path');
const CopyWbpackPlugin = require("copy-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin')
function resolve(dir) {
  return path.resolve(__dirname, '../', dir)
}
module.exports = webpackMerge(baseConfig, {
  mode: 'production',
  optimization: {
    namedChunks: true,
    // minimizer:[
    //   new TerserPlugin({
    //     sourceMap: true, // Must be set to true if using source-maps in production
    //     terserOptions: {
    //       compress: {
    //         drop_console: true,
    //       },
    //     },
    //   })
    // ],
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 10,
      maxInitialRequests: 10,
      automaticNameDelimiter: '-',
      name: true,
      cacheGroups: {
        echarts: {
          name: 'chunk-echarts',
          chunks: 'all',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?echarts(.*)/
        },
        elementUI: {
          name: 'chunk-elementUI',
          chunks: 'all',
          priority: 20,
          test: /[\\/]node_modules[\\/]_?element-ui(.*)/
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          // test: /[\\/]node_modules[\\/]/,
          maxInitialRequests: 5,
          priority: 1,
        }
      }
    }
  },
  plugins: [
    new CopyWbpackPlugin([
      { from: "static", to: "static"}
    ])
  ]
});
