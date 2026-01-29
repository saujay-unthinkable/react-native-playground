const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// config.resolver.blockList = [/.*\/typings\.(ts|tsx)$/, /.*\/styles\.(ts|tsx)$/];

config.resolver.alias = {
  "@": "./src",
};

module.exports = config;
