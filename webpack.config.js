const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/chatroom.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "chatroom-bundle.js",
  },
  devtool: false,
  watch: true,
};

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "bundle.js",
  },
  devtool: false,
  watch: true,
};
module.exports = {
  mode: "production",
  entry: "./src/login.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "login-bundle.js",
  },
  devtool: false,
  watch: true,
};

module.exports = {
  mode: "production",
  entry: "./src/signup.js",
  output: {
    path: path.resolve(__dirname, "public/js"),
    filename: "signup-bundle.js",
  },
  devtool: false,
  watch: true,
};
