module.exports = {
    testEnvironment: 'node',
    transform: {
        '\\.[jt]sx?$': [
            'babel-jest',
            {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' } }],
                    ['@babel/preset-react', { runtime: 'automatic' }],
                    '@babel/preset-typescript',
                ],
            },
        ],
    },
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/lib/'],
};
