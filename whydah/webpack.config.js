/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const DotEnv = require("dotenv-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
	entry: "./src/index.ts",
	target: "node",
	externals: [nodeExternals({ modulesDir: "../node_modules" })],
	externalsPresets: {
		node: true,
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
		],
	},
	resolve: {
		extensions: [".tsx", ".ts", ".js"],
		plugins: [new TsconfigPathsPlugin()],
	},
	output: {
		filename: "index.js",
		path: path.resolve(__dirname, "build"),
	},
	plugins: [new DotEnv()],
};
