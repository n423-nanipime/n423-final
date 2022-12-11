const path = require("path");

module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.(s[a|c]ss)$/,
  //       use: [
  //         // Creates `style` nodes from JS strings
  //         "style-loader",
  //         // Translates CSS into CommonJS
  //         "css-loader",
  //         // Compiles Sass to CSS
  //         "sass-loader",
  //       ],
  //     },
  //   ],
  // },
};
