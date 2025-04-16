import { withExpo } from '@expo/next-adapter';

/** @type {import('next').NextConfig} */
const nextConfig = withExpo({
    reactStrictMode: false,
    // swcMinify: true,
    productionBrowserSourceMaps: true,
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
    },
    transpilePackages: [
        'react-native',
        'expo',
        '@react-native/assets',
        'expo-asset',
        'expo-font',
        'expo-modules-core',
        '@expo/html-elements',
        '@bambooapp/bamboo-molecules',
        'react-native-vector-icons',
        '@bambooapp/bamboo-atoms',
        '@react-native/assets-registry',
        'react-native-actions-sheet',
        'react-native-reanimated',
        '@react-native-documents/picker',
        'react-native-gesture-handler',
        'react-native-mmkv',
        'react-native-svg',
        'react-native-safe-area-context',
        'moti',
        'react-native-super-grid',
        'react-native-toast-message',
        'expo-av',
        'expo-linear-gradient',
        'react-native-markdown-display',

        '@bambooapp/bamboo-molecules',
        '@webbeetechnologies/bamboo-shared',
        // Add more React Native/Expo packages here...
    ],
    experimental: {
        // forceSwcTransforms: true,
        webpackBuildWorker: true,
    },

    env: {
        APP_LOGGING: process.env.APP_LOGGING,
        AUTH_BASE_URL: process.env.AUTH_BASE_URL,
        BAMBOO_CDN_PATH: process.env.BAMBOO_CDN_PATH,
        BAMBOO_CDN_URL: process.env.BAMBOO_CDN_URL,
        BASE_URL: process.env.BASE_URL,
        BUGSNAG_API_KEY: process.env.BUGSNAG_API_KEY,
        BUGSNAG_RELEASE_STAGE: process.env.BUGSNAG_RELEASE_STAGE,
        CHAT_CODE_STRATEGY: process.env.CHAT_CODE_STRATEGY,
        CHAT_MODEL: process.env.CHAT_MODEL,
        CHAT_VOICE_MODEL: process.env.CHAT_VOICE_MODEL,
        DASHBOARD_BASE_URL: process.env.DASHBOARD_BASE_URL,
        ENABLE_API_CACHE: process.env.ENABLE_API_CACHE,
        FILE_UPLOAD_LIMIT: process.env.FILE_UPLOAD_LIMIT,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        INLINE_UPDATE_DELAY: process.env.INLINE_UPDATE_DELAY,
        LINKED_FIELD_PAGINATION_COUNT: process.env.LINKED_FIELD_PAGINATION_COUNT,
        MAX_SUGGESTION_CHAR_INPUT: process.env.MAX_SUGGESTION_CHAR_INPUT,
        REDUX_LOGGER: process.env.REDUX_LOGGER,
    },
    webpack(config) {
        return config;
    },
});

export default nextConfig;
