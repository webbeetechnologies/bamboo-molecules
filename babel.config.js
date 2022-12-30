module.exports = api => {
    api.cache(true);
    const presets = [['babel-preset-expo', { jsxRuntime: 'automatic' }]];
    // to resolve the bamboo-shoots packages directory
    const plugins = [
        [
            'module-resolver',
            {
                root: ['./src'],
                extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
