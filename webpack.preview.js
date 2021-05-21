const { merge } = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  entry: './src/Frontend/EntryPoints/preview.tsx',
});
