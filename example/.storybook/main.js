module.exports = {
    stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
        'storybook-addon-performance/register',
    ],
    features: {
        interactionsDebugger: true,
    },
    framework: '@storybook/react',
};
