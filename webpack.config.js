const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const moduleBundle = {
  entry: {
    'quill-cursors': './src/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    library: 'QuillCursors',
    libraryExport: 'default',
    libraryTarget: 'umd',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    static: [
      path.join(__dirname, 'example'),
      path.join(__dirname, 'node_modules/quill/dist'),
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
  ],
};

module.exports = (argv) => {
  if (argv.mode === 'production') {
    delete moduleBundle.devtool;
  }

  return moduleBundle;
};
