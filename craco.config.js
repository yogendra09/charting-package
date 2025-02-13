module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.module.rules.push({
          test: /\.(js|jsx)$/,
          include: /node_modules\/my-react-charting-npm-package/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"]
            }
          }
        });
        return webpackConfig;
      },
    },
  };
  