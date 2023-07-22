const path = require('path');
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
                alias: {
                    '@bambooapp/bamboo-molecules': path.resolve(__dirname, './src/'),
                },
            },
        ],
    ];

    return {
        presets,
        plugins,
    };
};
