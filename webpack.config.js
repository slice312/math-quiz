const path = require("path");
const {merge} = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const dotenvPlugin = require("dotenv-webpack");


const commonConfig = {
    entry: "./src/index.js",
    output: {
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "./build"),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css" // TODO: для дев сервера кеш здесь не рабтает
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "./src/pages",
                    to: "./src/pages",
                    filter: (filepath) => path.extname(filepath) === ".html"
                },
                {
                    from: "./src/assets",
                    to: "./src/assets"
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.(sass|scss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader, // TODO: вернуть этот лоадер и убрать style-loader в итоговом билде
                    // "style-loader",
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
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};


const prodConfig = {
    mode: "production",
    plugins: [
        new dotenvPlugin({
            path: ".envProd"
        })
    ]
};


const devConfig = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        port: 5007,
        static: "./build",
        hot: true,
        historyApiFallback: true,
        watchFiles: [
            "./src/index.html",
            "./src/templates/*.html"
        ]
    },
    plugins: [
        new dotenvPlugin({
            path: ".envDev"
        })
    ]
};


module.exports = (env, argv) => {
    switch (argv.mode) {
        case "development":
            return merge(commonConfig, devConfig);
        case "production":
            return merge(commonConfig, prodConfig);
        default:
            throw new Error("No matching configuration was found!");
    }
};