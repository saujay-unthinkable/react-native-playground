const expoConfig = require("eslint-config-expo/flat");

module.exports = [
  ...expoConfig,
  {
    ignores: [
      "node_modules",
      "babel.config.js",
      "metro.config.js",
      "expo-env.d.ts",
    ],
  },
];
