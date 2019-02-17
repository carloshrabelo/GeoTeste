const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = function(env){
    const nodeEnv = env && env.prod ? 'production' : 'development';
    const isProd = nodeEnv === 'production';

    return {
        entry: isProd ? [
            './src/index.js'
            ] : [
            'webpack-dev-server/client?http://localhost:8080',
            'webpack/hot/only-dev-server',
            './src/index.js'
        ],
        devtool :"cheap-module-source-map",
        module: {
            rules: [{
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: [
                        'react-hot-loader',
                        'babel-loader'
                    ].slice( isProd ? 1 : 0)
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: 'css-loader'
                    })
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ['babel-loader', 'eslint-loader']
                },{
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader'],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                    loader: 'url-loader?limit=100000&outputPath=fonts/'
                }
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx', '.css','.png'],
        },
        output: {
            path: __dirname + '/dist',
            publicPath: '/',
            filename: 'bundle.js'
        },
        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
                }
            })
        ].concat( isProd ? [
            new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
            new ExtractTextPlugin({
                filename: 'bundle.css',
                disable: false,
                allChunks: true
            }),
            new webpack.optimize.AggressiveMergingPlugin({
                minSizeReduce: 1,
                moveToParents: true
    
            })
            ] : [
                new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
                new ExtractTextPlugin({ disable: true })
            ]
        ),
        devServer: {
            contentBase: './dist',
            historyApiFallback: true
        }
    
    }
}
