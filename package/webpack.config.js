const HtmlWebpackPlugin = require( 'html-webpack-plugin' );

module.exports = {
    mode: 'production',
    entry: './index.es6.js',
    output: {
        library: 'Improl',
        libraryTarget: 'var',
        path: __dirname,
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules|wasm_exec/,
                use: [ 'babel-loader' ]
            }
        ]
    },
    plugins: [
        process.env.NODE_ENV !== 'development' ? null : new HtmlWebpackPlugin( {
            template: './demo.html',
        } )
    ].filter( Boolean ),
    devServer: {
        injectClient: false
    }
};