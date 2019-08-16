const path = require("path");
// const webpack = require("webpack");
// const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const AntDesignThemePlugin = require('antd-theme-webpack-plugin');
// const CopyPlugin = require("copy-webpack-plugin");
// 引入 DllReferencePlugin
// const DllReferencePlugin = webpack.DllReferencePlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
console.warn("================================ ");
console.warn("__dirname : ", __dirname);
console.warn("path.resolve(dist) : ", path.resolve("dist"));
console.warn("path.resolve(src) : ", path.resolve("src"));
console.warn("================================ ");
module.exports = {
  //入口
  entry: {
    app: "./src/Index.tsx"
  },
  //输出目录
  output: {
    path: path.resolve("dist"),
    publicPath: "/"
  },
  resolve: {
    //解析资源
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      src: path.resolve(__dirname, "../src/")
    }
  },
  optimization: {
    // 导出
    usedExports: true,
    //运行时库打包模式
    runtimeChunk: "single"
  },

  module: {
    rules: [
      {
        test: /\.css$/, //CSS
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: "../"
            }
          },
          "css-loader"
        ]
      },

      {
        test: /\.less$/,
        use: [
          {
            loader: "style-loader" // creates style nodes from JS strings
          },
          {
            loader: "css-loader" // translates CSS into CommonJS
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },

      {
        test: /\.(png|svg|jpg|gif)$/, //图片尽量避免使用
        use: ["file-loader"]
      },
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" } //typescript解析
    ]
  },
  // resolve: {
  //   extensions: [".ts", ".tsx", "js", ".json",  ".css"],
  //   alias: {
  //     '@': path.resolve(__dirname, 'src'),
  //   }
  // },
  plugins: [
    //动态创建html
    new HtmlWebpackPlugin({
      title: "工资系统",
      template: "src/index.html"
    }),
    new AntDesignThemePlugin({
      indexFileName: 'src/index.html',
      antDir: path.resolve(__dirname, '../node_modules/antd'),
      stylesDir: path.resolve(__dirname, '../src/styles'),
      varFile: path.resolve(__dirname, '../src/styles/_var.less'),
      mainLessFile: path.resolve(__dirname, '../src/styles/global.less'),
      themeVariables: [
          '@primary-color'
      ],
    })
  ]
};
