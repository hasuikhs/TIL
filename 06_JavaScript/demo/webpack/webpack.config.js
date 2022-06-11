const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, 'src', 'index.js')
  },
  output: {
    filename: 'output.js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
        exclude: ['/node_modules'],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
        exclude: ['/node_modules'],
        use: {
          loader: "ts-loader",
        }
      }
    ]
  }
}
