const baseConfig = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");
const friendPlugin = require("friendly-errors-webpack-plugin");
const CopyWbpackPlugin = require("copy-webpack-plugin");

module.exports = webpackMerge(baseConfig, {
    mode: "development",
    // devtool: "cheap-module-eval-source-map",
    devServer: {
        host: "0.0.0.0",
        port: 9010,
        contentBase: "./dist",
        stats: "errors-only",
        historyApiFallback:true,
        proxy: [
            {
                context: [
                    "/auth",
                    "/platform",
                    "/business",
                    "/logserver",
                    "/bi",
                    "/fileservice",
                    "/etl",
                    "/cache",
                    "/quota",
                    "/vbi-scheduler-admin",
                ],
                target: "http://172.16.209.21:8080/ ",
                secure: false,
                changeOrigin: true,
            },
        ],
    },
    plugins: [
        new friendPlugin({
            compilationSuccessInfo: {
                messages: [
                    `Your application is running here: http://127.0.0.1:9010`,
                ],
            },
        }),
        // new CopyWbpackPlugin({ patterns: [{ from: "static", to: "static" }] }),
    ],
});
