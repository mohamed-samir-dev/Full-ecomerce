// webpack.config.js
module.exports = {
  resolve: {
    alias: {
      'core-js/modules': false,
      'regenerator-runtime': false,
    },
  },
  optimization: {
    usedExports: true,
    sideEffects: false,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: {
                  chrome: '90',
                  firefox: '88',
                  safari: '14',
                  edge: '90'
                },
                useBuiltIns: false,
                modules: false
              }]
            ]
          }
        }
      }
    ]
  }
};