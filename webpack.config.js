'use strict';

module.exports = {
    entry: './src/main.js',
    output: {
        path: './',
        filename: 'bundle.js'
    },
    devtool: '#source-map',
    devServer: {
        port: 3333,
        inline: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                  presets: ['react', 'babel-preset-es2015']
                }
            },
            {
                test: /\.json?$/,
                loader: 'json'
            }
        ]
    }
}