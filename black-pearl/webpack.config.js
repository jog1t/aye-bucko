/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
	mode: "development",
	entry: "./src/index.ts",
	devServer: {
		contentBase: path.join(__dirname, "build"),
		port: 9000,
		host: "0.0.0.0",
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: {
					loader: "ts-loader",
					options: {
						transpileOnly: true,
					},
				},
				exclude: /node_modules/,
			},
			{
				test: /\.(png|css|json)$/i,
				type: "asset/resource",
			},
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		plugins: [new TsconfigPathsPlugin()],
	},
	output: {
		filename: "[name].[contenthash].js",
		path: path.resolve(__dirname, "build"),
	},
	plugins: [
		new HtmlWebpackPlugin({ template: "./src/index.html" }),
		new DotEnv({ systemvars: true }),
	],
};
