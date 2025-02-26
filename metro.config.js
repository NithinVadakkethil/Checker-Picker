const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withNativeWind } = require("nativewind/metro");
const { wrapWithReanimatedMetroConfig } = require("react-native-reanimated/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// Modify the resolver to support SVG
defaultConfig.resolver.assetExts = defaultConfig.resolver.assetExts.filter(ext => ext !== "svg");
defaultConfig.resolver.sourceExts.push("svg");

// Add transformer for SVG support
defaultConfig.transformer.babelTransformerPath = require.resolve("react-native-svg-transformer");

// Merge configurations
let config = mergeConfig(defaultConfig, {});

// Wrap with NativeWind
config = withNativeWind(config, { input: "./global.css" });

// Wrap with Reanimated
config = wrapWithReanimatedMetroConfig(config);

module.exports = config;
