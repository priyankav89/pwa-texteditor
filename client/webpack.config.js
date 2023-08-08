const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

//Adding  configure workbox plugins for a service worker and manifest file.
//Adding CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: '/Users/priyanka/bootcamp/Homework/PWAtexteditor/pwa/JATE/client/src/js/index.js',
      install: '/Users/priyanka/bootcamp/Homework/PWAtexteditor/pwa/JATE/client/src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'JATE'
      }),

      
      new WebpackPwaManifest({
        name: 'JATE',
        short_name: 'TEXT-EDITOR.',
        description: 'Its a Text Editor',
        background_color: '#ffffff',
        fingerprints: false,
        publicPath: '.',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
            destination: path.join('assets', 'icons'),
          }
        ]
      }),
      new InjectManifest({
        swSrc: '/Users/priyanka/bootcamp/Homework/PWAtexteditor/pwa/JATE/client/src-sw.js',
        swDest: '/Users/priyanka/bootcamp/Homework/PWAtexteditor/pwa/JATE/client/dist/service-worker.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};