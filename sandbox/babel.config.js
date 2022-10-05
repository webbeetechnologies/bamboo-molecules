module.exports = api => {
    api.cache(true);
    const presets = ['babel-preset-expo'];
    // to resolve the bamboo-shoots packages directory

    return {
        presets,
        plugins: [],
    };
};
