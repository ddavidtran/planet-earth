var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//Absolute paths of our content.
var ROOT_PATH = path.resolve(__dirname);
var ENTRY_PATH = path.resolve(ROOT_PATH, 'src/js/main.js');
var SRC_PATH = path.resolve(ROOT_PATH, 'src');
var JS_PATH = path.resolve(ROOT_PATH, 'src/js');
var TEMPLATE_PATH = path.resolve(ROOT_PATH, 'src/index.html');
var SHADER_PATH = path.resolve(ROOT_PATH, 'src/shaders');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');
var SCSS_PATH = path.resolve(ROOT_PATH,'src/css');
var ASSETS_PATH = path.resolve(ROOT_PATH, 'src/assets');

var debug = process.env.NODE_ENV !== 'production';

module.exports = {
    entry: ENTRY_PATH,
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Procedural Project',
            template: TEMPLATE_PATH,
            inject: 'body'
        }),
        new webpack.LoaderOptionsPlugin({
            debug: true
          })
    ],
    output: {
        path: BUILD_PATH,
        filename: 'bundle.js',
    },
    resolve: {
        alias:{
            SHADERS: SHADER_PATH,
            SRC: SRC_PATH,
            SCSS: SCSS_PATH,
            JS: JS_PATH,
            ASSETS: ASSETS_PATH
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: JS_PATH,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    cacheDirectory: true,
                    presets: ['@babel/preset-env']
                }
            },
            {
                test: /\.glsl$/,
                include: SHADER_PATH,
                loader: 'webpack-glsl-loader'
            },
            {
                test: /\.scss$/,
                include: SCSS_PATH,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader" // compiles Sass to CSS, using Node Sass by default
                ]
            },
            {
                test: /\.(png|jpe?g|tga|gif)$/,
                include: ASSETS_PATH,
                loader: 'file-loader'
            }

        ]
    },
    devtool: debug ? 'eval-source-map' : 'source-map'
};