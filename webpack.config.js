const path = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: "eval-source-map",
  watch: true,
};

module.exports = {
  mode: "development",
  entry: "./src/chatroom.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "chatroom-bundle.js",
  },
  devtool: "eval-source-map",
  watch: true,
};

module.exports = {
  mode: "development",
  entry: "./src/signup.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "signup-bundle.js",
  },
  devtool: "eval-source-map",
  watch: true,
};

module.exports = {
  mode: "development",
  entry: "./src/login.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "login-bundle.js",
  },
  devtool: "eval-source-map",
  watch: true,
};
