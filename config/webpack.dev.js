const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const path = require("path");

const manifestPath = path.resolve("dll/dev/vendor.manifest.json");
console.log("--------------------manifestPath:", manifestPath);

module.exports = merge(common, {
    mode: "development",
    output: {
        filename: "[name].js"
    },
    devtool: "inline-source-map",

    devServer: {
        contentBase: "./dist",
        //热加载
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/api": {
                target: "http://192.168.1.100:8081",
                changeOrigin: true,
                secure: false
            },
  
            "/json/api": {
                target: "http://localhost:3000",
                pathRewrite: {
                    "^/json/api": "/"
                },
                ws: true,
                changeOrigin: true
            }

           
        }
    },

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },

    module: {
        rules: [
            // 输出 '.js' 文件带源码映射
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
    plugins: [
        // 输出文件名规则
        new webpack.NamedModulesPlugin(),
        // 热加载
        new webpack.HotModuleReplacementPlugin(),
        //dll库
        new webpack.DllReferencePlugin({
            manifest: require("../dll/dev/vendor.manifest.json")
        }),
        //复制
        new CopyPlugin([{ from: path.resolve("dll/dev"), to: "" }, { from: path.resolve("public"), to: "" }]),
        //css独立打包
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
});
