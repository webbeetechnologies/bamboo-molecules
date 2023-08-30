const path = require('path');

const storybookPlugins = [
    [
        'module-resolver',
        {
            root: ['./src'],
            extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
            alias: {
                '@bambooapp/bamboo-molecules': path.resolve(__dirname, './src/'),
                '@bambooapp/bamboo-molecules/components': path.resolve(
                    __dirname,
                    './src/components',
                ),
                '@bambooapp/bamboo-molecules/fast-context': path.resolve(
                    __dirname,
                    './src/fast-context',
                ),
            },
        },
    ],
    '@babel/plugin-proposal-export-namespace-from',
];

const bundlePlugins = ['@babel/plugin-proposal-export-namespace-from'];

module.exports = api => {
    api.cache(true);
    const presets = [['babel-preset-expo', { jsxRuntime: 'automatic' }]];

    // const presets = [
    //     [
    //         '@babel/preset-env',
    //         {
    //             targets: { node: '18' },
    //         },
    //     ],
    //     ['@babel/preset-react', { runtime: 'automatic' }],
    //     '@babel/preset-typescript',
    // ];

    const plugins = process.env.MOLECULES_ENV === 'storybook' ? storybookPlugins : bundlePlugins;

    return {
        presets,
        plugins,
    };
};
