const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
    transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
    },
    // Add this resolver configuration
    resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx', 'cjs', 'mjs'],
        unstable_enablePackageExports: true,
        unstable_conditionNames: ['require', 'node'],
    },
});

module.exports = config;
