var webpack = require('webpack');
var path = require("path");

var config = {
    context: __dirname + '/app',
    entry: './index.js',
    devServer: {
        historyApiFallback: true,
        host: "0.0.0.0"
    },
    output: {
        path: __dirname + '/app',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            ON_TEST: process.env.NODE_ENV === 'test'
        })
    ],
    module: {
        loaders: [
            {test: /\.js$/, loader: 'babel', exclude: /node_modules/, query: {
                cacheDirectory: true,
                presets: ['es2015']
            }},
            {test: /\.html$/, loader: 'raw', exclude: /node_modules/},
            {test: /\.css$/, loader: 'style!css'},
            {test: /\.scss$/, loader: 'style!css!sass'},
            {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader"},
            {test: /\.(ico|txt)$/, loader: 'file-loader'},
            {test: /\.png$/, loader: "url-loader?limit=100000"},
            {test: /\.(jpg|gif)$/, loader: "file-loader"}
        ]
    }
};

if (process.env.NODE_ENV === 'production') {
    config.output.path = __dirname + '/dist';
    config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    config.devtool = 'source-map';
}

module.exports = config;
