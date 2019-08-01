const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

console.log("------------------ dll/build:", path.resolve("dll/build"));
module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",
    output: {
        filename: "[name].[contenthash].js"
    },
    // 公共代码
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
    plugins: [
        // 删除发布目录
        new CleanWebpackPlugin(),
        // 编译输出文件名
        new webpack.HashedModuleIdsPlugin(),
        // 依赖Dll
        new webpack.DllReferencePlugin({
            manifest: require("../dll/build/vendor.manifest.json")
        }),
        // 复制资源文件
        new CopyPlugin([{ from: path.resolve("dll/build"), to: "" }, { from: path.resolve("public"), to: "" }]),
        //CSS抽离独立存放
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        })
    ]
});
