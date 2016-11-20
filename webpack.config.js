var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './es6/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'es6'),
                query: {
                  presets: 'es2015',
                },
            },
            {test: /\.html$/, loader: 'html'},
            {test:/\.css$/, loader: 'style!css!less'}
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map',
};