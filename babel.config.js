module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        alias: {
          tests: ["./tests/"],
          "@assets": "./src/assets",
          "@config": "./src/config",
          "@context": "./src/context",
          "@libraries": "./src/libraries",
          "@localization": "./src/localization",
          "@routes": "./src/routes",
          "@store": "./src/store",
        },
      },
    ],
  ],
};
