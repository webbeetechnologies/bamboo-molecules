const path = require('path');

module.exports = api => {
    api.cache(true);
    const presets = ['babel-preset-expo'];
    // to resolve the bamboo-shoots packages directory
    const plugins = [
        [
            'module-resolver',
            {
                root: ['../src'],
                extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
                alias: {
                    'bamboo-molecules': path.resolve(__dirname, '../src/'),
                },
            },
        ],
    ];

    const env = {
        production: {
            plugins: ['react-native-paper/babel'],
        },
    };

    return {
        presets,
        plugins,
        env,
    };
};
