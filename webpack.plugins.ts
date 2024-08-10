// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import webpack from "webpack";

// eslint-disable-next-line @typescript-eslint/no-var-requires
import ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

export const plugins = [
  new ForkTsCheckerWebpackPlugin({
    logger: "webpack-infrastructure",
  }),
  new webpack.EnvironmentPlugin({
    APP_ENV: process.env.APP_ENV,
    API_URL: process.env.API_URL,
  }),
];
