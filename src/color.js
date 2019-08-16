// const path = require('path');
// const { generateTheme, getLessVars } = require('antd-theme-generator');

// const options = {
//   indexFileName: 'src/index.html',
//   antDir: path.resolve(__dirname, '../node_modules/antd'),
//   stylesDir: path.resolve(__dirname, './styles'),
//   varFile: path.resolve(__dirname, './styles/_var.less'),
//   mainLessFile: path.resolve(__dirname, './styles/global.less'),
//   themeVariables: [
//     '@primary-color',
//     '@menu-color',
//     '@menu-item-font-size',
//     '@menu-icon-size',
//     '@menu-bg',
//     '@menu-item-color',
//     '@menu-highlight-color',
//     '@menu-item-active-bg',
//     '@menu-item-active-color'
//   ],
//   outputFilePath: path.join(__dirname, './color.less'),
// }

// generateTheme(options).then((less) => {
//   console.log('Theme generated successfully');
// })
// .catch((error) => {
//   console.log('Error', error);
// });