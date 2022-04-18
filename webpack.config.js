const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = env => {
    return {
        entry: "./src/index.tsx",
        plugins: [
            new CleanWebpackPlugin({cleanStaleWebpackAssets: false}),
        ],

        resolve: {
            extensions: [".ts", ".tsx", ".js"],
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    include: path.resolve(__dirname, './src')
                }
            ]
        },
        

        output: {
            library: {
                name: "react-role",
                type: "umd"
            },

            filename: "index.js",
            path: path.resolve(__dirname, "dist"),
            globalObject: "this",
        },

        externals: {
            react: "react",
            "react-dom": "react-dom",
            "react-router-dom": "react-router-dom",
        }
    }
};