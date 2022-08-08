const path = require("path");
module.exports = {
  mode: "production",
  entry: "./src/login.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "login-bundle.js",
  },
  devtool: false,
  watch: true,
};

module.exports = {
  mode: "production",
  entry: "./src/signup.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "signup-bundle.js",
  },
  devtool: false,
  watch: true,
};

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },
  devtool: false,
  watch: true,
};

module.exports = {
  mode: "production",
  entry: "./src/chatroom.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "chatroom-bundle.js",
  },
  devtool: false,
  watch: true,
};
