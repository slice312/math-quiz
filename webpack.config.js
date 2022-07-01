const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const dotenvPlugin = require('dotenv-webpack');


module.exports = (env, argv) => {
    return (argv.mode === "production")
        ? prodConfig
        : devConfig;
};


const prodConfig = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./build"),
        clean: true,
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name][ext][query]`;
        }
    },
    plugins: [
        new dotenvPlugin({
            path: ".envProd"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/templates",
                    to: "./templates"
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // MiniCssExtractPlugin.loader, // TODO: вернуть этот лоадер и убрать style-loader в итоговом билде
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    }
};

const devConfig = {
    mode: "development",
    devtool: "source-map",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "./build"),
        clean: true,
        assetModuleFilename: (pathData) => {
            const filepath = path
                .dirname(pathData.filename)
                .split("/")
                .slice(1)
                .join("/");
            return `${filepath}/[name][ext][query]`;
        }
    },
    devServer: {
        port: 5007,
        static: "./build",
        hot: true,
        historyApiFallback: true,
        watchFiles: [
            "./src/index.html",
            "./src/templates/*.html"
        ],
    },
    plugins: [
        new dotenvPlugin({
            path: ".envDev"
        }),
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/templates",
                    to: "./templates"
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // MiniCssExtractPlugin.loader, // TODO: вернуть этот лоадер и убрать style-loader в итоговом билде
                    "style-loader",
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource"
            }
        ]
    }
};