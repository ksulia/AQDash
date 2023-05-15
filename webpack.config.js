const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});
const path = require('path')
module.exports = {
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'src'),
        publicPath: "/aq",

    },
    mode: 'production',
    // mode: 'development',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }, 
    resolve: {
        extensions: ['', '.js'],
        alias: {
            webworkify: 'webworkify-webpack',
            'mapbox-gl': path.resolve('./node_modules/mapbox-gl/dist/mapbox-gl.js')
        }
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            use: { loader: 'babel-loader' },
            exclude: /node_modules/,
            // query: {
            //     presets: ['es2015', 'stage-0']
            // }
        },
        {
            test: /\.js$/,
            include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
            use: { loader: 'worker' }
        },
        {
            test: /\.css$/,
            use: [{ loader: "style-loader" }, { loader: "css-loader" }]
        },
        { test: /\.json$/, use: { loader: 'json-loader' }, type: 'javascript/auto' },
        {
            test: /mapbox-gl.+\.js$/,
            dependency: { not: ['url'] },
            use: { loader: 'transform-loader/?brfs' }
        },
        {
            test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            use: { loader: 'url-loader?limit=100000' }
        }],
    },
    plugins: [htmlPlugin],
    devServer: {
        compress: true,
        allowedHosts: 'all',
        historyApiFallback: { index: '/aq' },
        port: '3000',
        //        proxy: {
        //          '/api':{
        //              target:'http://10.233.88.253:3005',
        //              secure:false,
        //          }  
        //        },

    },
};

