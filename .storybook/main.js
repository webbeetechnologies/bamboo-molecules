module.exports = {
    stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
        'storybook-addon-performance/register',
        '@storybook/addon-coverage',
    ],
    features: {
        interactionsDebugger: true,
    },
    framework: '@storybook/react',
    webpackFinal: async (config, { configType }) => {
        config.devtool = 'source-map';
        return config;
    },
    core: {
        builder: 'webpack5',
    },
};
