module.exports = {
    stories: ['../stories/**/*.stories.@(js|jsx|ts|tsx)'],

    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
        '@storybook/addon-react-native-web',
        'storybook-addon-performance/register',
        '@storybook/addon-coverage',
        '@storybook/addon-webpack5-compiler-babel',
        '@chromatic-com/storybook'
    ],

    features: {
        interactionsDebugger: true,
    },

    framework: {
        name: '@storybook/react-webpack5',
        options: {}
    },

    webpackFinal: async (config, { configType }) => {
        config.devtool = 'source-map';
        config.resolve.fallback = {
            tty: false,
            os: false,
        }
        return config;
    },

    typescript: {
        reactDocgen: 'react-docgen-typescript-plugin'
    },

    docs: {}
};
