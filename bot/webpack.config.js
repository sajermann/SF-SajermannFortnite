const path = require('path');
// const nodeExternals = require('webpack-node-externals');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  // mode: 'development', // Desativa minificação
  devtool: 'source-map', // Gera source maps
  optimization: {
    minimize: false, // Garante que não minificará
  },

  target: 'node',
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'index.js',
    libraryTarget: 'commonjs2',
  },

  node: {
    __filename: true,
    __dirname: true,
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        // exclude: /node_modules/,
      },
      {
        test: /\.node$/,
        use: 'node-loader',
      },
    ],
  },
  externals: {
    'zlib-sync': 'commonjs2 ./src/lib/zlib-sync-polyfill.js',
  },
  resolve: {
    extensions: ['.ts', '.js'],
    // alias: {
    //   '@templates': path.resolve(__dirname, 'src/templates'),
    // },
    alias: {
      'zlib-sync': path.resolve(
        __dirname,
        'node_modules/fflate/esm/browser.js',
      ), // ou pako
    },
    fullySpecified: false,
    fallback: {
      stream: require.resolve('stream-browserify'),
      util: require.resolve('util/'),
      buffer: require.resolve('buffer/'),
      zlib: require.resolve('browserify-zlib'),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/template',
          to: 'template',
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'package.json'),
          to: path.resolve(__dirname, 'build/package.json'),
          force: true,
        },
      ],
    }),
  ],
};
