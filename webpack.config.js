const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = (env, argv) => {
    return (argv.mode === "production")
        ? {}
        : devConfig;
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
        watchFiles: ["./src/index.html"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            inject: "body"
        }),
        new MiniCssExtractPlugin({
            filename: "index.css"
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