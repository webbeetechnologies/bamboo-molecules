const path = require('path');
const blacklist = require('metro-config/src/defaults/exclusionList');
const escape = require('escape-string-regexp');
const pak = require('./package.json');

const fs = require('fs');

// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

const src = path.resolve(__dirname, './src');

const rootNodeModules = path.resolve(__dirname, '../../node_modules');
const workspacePackages = [
    path.resolve(__dirname, '../../packages/molecules'),
    path.resolve(__dirname, '../common'),
]
    .map(workspaceRoot =>
        fs
            .readdirSync(workspaceRoot)
            .map(workspacePackage => path.join(workspaceRoot, workspacePackage)),
    )
    .flat();

const packageRoots = workspacePackages.reduce((packages, packagePath) => {
    const stat = fs.statSync(packagePath);
    if (!stat.isDirectory()) return packages;
    return packages.concat(packagePath);
}, []);

const nodeModules = path.resolve(__dirname, 'node_modules');
const packageNodeModules = [path.resolve(rootNodeModules), ...packageRoots].map(packagePath =>
    path.resolve(packagePath, 'node_modules'),
);

const peerDependencies = Object.keys({
    ...pak.peerDependencies,
});

// List of modules to blacklist
const modulesToBlacklist = [
    // Add other modules to blacklist if needed
];

module.exports = (() => {
    const config = getDefaultConfig(__dirname);

    config.watchFolders = [src, ...packageRoots, rootNodeModules, nodeModules];
    config.projectRoot = __dirname;

    const { transformer, resolver } = config;

    config.transformer = {
        ...transformer,
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: true,
                inlineRequires: false,
            },
        }),
        // babelTransformerPath: require.resolve('react-native-svg-transformer'),
    };

    config.resolver.assetExts.push('db');

    config.resolver = {
        ...resolver,
        sourceMapsEnabled: true,
        useWatchman: false,
        unstable_enableSymlinks: true,
        unstable_enablePackageExports: true,
        unstable_conditionNames: ['browser', 'require', 'react-native'],
        blacklistRE: blacklist([
            ...peerDependencies.map(m => new RegExp(`^${escape(path.join(nodeModules, m))}\\/.*$`)),
            ...modulesToBlacklist.map(
                m => new RegExp(`^${escape(path.join(nodeModules, m))}\\/.*$`),
            ),
            ...modulesToBlacklist.map(
                m => new RegExp(`^${escape(path.join(packageNodeModules[0], m))}\\/.*$`),
            ),
        ]),
        extraNodeModules: peerDependencies.reduce((acc, name) => {
            acc[name] = path.join(nodeModules, name);
            return acc;
        }, {}),
        disableHierarchicalLookup: true,
        assetExts: resolver.assetExts.filter(ext => ext !== 'svg'),
        sourceExts: [...resolver.sourceExts, 'svg', 'json'],
        // resolveRequest: (context, moduleName, platform) => {
        //     if (moduleName.startsWith('graphql-request')) {
        //         return {
        //             filePath: `${packageNodeModules[0]}/graphql-request/build/esm/index.js`,
        //             type: 'sourceFile',
        //         };
        //     }

        //     return context.resolveRequest(context, moduleName, platform);
        // },
        nodeModulesPaths: [rootNodeModules, nodeModules, ...packageNodeModules],
    };

    return config;
})();
