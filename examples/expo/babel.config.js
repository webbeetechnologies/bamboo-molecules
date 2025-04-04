module.exports = function (api) {
    api.cache(true);
    const unistylesPluginOptions = {};

    return {
        // for bare React Native
        // presets: ['module:@react-native/babel-preset'],

        // or for Expo
        presets: ['babel-preset-expo'],

        // other config
        plugins: [
            // other plugins
            ['react-native-unistyles/plugin', unistylesPluginOptions],
        ],
    };
};
