const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "mfs",
    projectName: "ui-library",
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    externals: [
      "single-spa",
      /^@mfs\/.+$/,
      /^react$/,
      /^react-dom$/,
      /^styled-components$/,
      /^redux$/,
      /^react-redux$/,
    ]
  });
};
