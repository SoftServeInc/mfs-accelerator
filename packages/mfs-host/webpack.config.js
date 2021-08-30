const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-ts");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

require("dotenv").config();

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "mfs";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          orgName,
          injectConfigValue: (value) => process.env[value]
        },
      }),
      new WorkboxPlugin.InjectManifest({
        swSrc: "./src/sw.js",
        swDest: "sw.js",
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: "./src/manifest.json", to: "manifest.json" },
          { from: "./src/sw.js", to: "sw.js" },
          { from: "./src/assets", to: "assets" },
          { from: "./src/import-map.json", to: "import-map.json" },
        ],
      }),
    ],
  });
};
