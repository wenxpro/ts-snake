//引入包
const path = require('path')
//引入html 插件
const HTMLWebpackPlugin = require('html-webpack-plugin')
//引入clean 插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

//webpack 的配置信息
module.exports = {

    //指定入口文件
    entry: './src/index.ts',
    //指定打包文件目录
    output: {
        path: path.resolve(__dirname, 'dist'),
        //打包后文件
        filename: "bundle.js",
        //已过时
        // environment:{
        //     arrowFuction: false
        // }
    },
    //指定打包使用模块
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        options: {
                            presets:[
                                ["@babel/preset-env",
                                    {
                                        targets: {
                                            "chrome": "78",
                                            "ie": "11"
                                        },
                                        "corejs": "3",
                                        //已过时
                                        //使用core js方法 usage 按需加载
                                        // "useBuildIns":"usage"
                                    }
                                ]
                            ]

                        }
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
            //设置less 文件处理
            {
                test:/.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins:[
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers:'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            }
        ]
    },
    //配置webpack插件
    plugins: [
        new HTMLWebpackPlugin({
            // title: "Webpack App",
            template: "./src/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    //用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }

};
