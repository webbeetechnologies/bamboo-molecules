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

    return {
        presets,
        plugins: ['@babel/plugin-proposal-export-namespace-from'],
    };
};
