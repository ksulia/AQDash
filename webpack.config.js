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
    //mode: 'development',
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: "babel-loader"
            }
        },
        {
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
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
        historyApiFallback: true,
        port: '3000',
        //        proxy: {
        //          '/api':{
        //              target:'http://10.233.88.253:3005',
        //              secure:false,
        //          }  
        //        },

    },
};

