// metro.config.js
// Learn more: https://docs.expo.dev/guides/customizing-metro/
const { getDefaultConfig } = require('expo/metro-config');
const exclusionList = require('metro-config/src/defaults/exclusionList');

const config = getDefaultConfig(__dirname);

config.resolver.blacklistRE = exclusionList([
  /android\/build\/.*/,
  /android\/app\/build\/.*/,
  /android\/\.gradle\/.*/,
  /gradle-home\/.*/,
]);

module.exports = config;
