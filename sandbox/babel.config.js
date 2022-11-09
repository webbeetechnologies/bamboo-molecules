module.exports = function (api) {
    api.cache(true);
    const presets = ['babel-preset-expo'];

    const plugins = [
        [
            'module-resolver',
            {
                root: ['../src'],
                extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
                alias: {
                    'bamboo-molecules': '../src/',
                },
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
