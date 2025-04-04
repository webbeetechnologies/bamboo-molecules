const fs = require('fs');
const path = require('path');
const componentsDir = path.join(__dirname, '../src/components');

// Create the components directory if it doesn't exist
const outputDir = path.join(__dirname, '../components');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Create base components package.json
const componentsPackageJson = {
    name: '@bambooapp/bamboo-molecules/components',
    version: '1.0.0',
    description: 'All components from bamboo-molecules',
    main: '../lib/commonjs/components/index.js',
    module: '../lib/module/components/index.js',
    types: '../lib/typescript/components/index.d.ts',
    author: 'Thet Aung <thetaung.dev@gmail.com>',
    license: 'MIT',
    sideEffects: false,
};

fs.writeFileSync(
    path.join(outputDir, 'package.json'),
    JSON.stringify(componentsPackageJson, null, 2),
);

// Get all component directories
const componentFolders = fs.readdirSync(componentsDir).filter(folder => {
    // Filter out files and hidden directories
    const stats = fs.statSync(path.join(componentsDir, folder));
    return stats.isDirectory() && !folder.startsWith('.');
});

// Create individual component package.json files
componentFolders.forEach(folder => {
    const componentDir = path.join(outputDir, folder);

    // Create component directory if it doesn't exist
    if (!fs.existsSync(componentDir)) {
        fs.mkdirSync(componentDir, { recursive: true });
    }

    // Create package.json for the component
    const packageJson = {
        name: `@bambooapp/bamboo-molecules/components/${folder}`,
        version: '1.0.0',
        description: `${folder} component from bamboo-molecules`,
        main: `../../lib/commonjs/components/${folder}/index.js`,
        module: `../../lib/module/components/${folder}/index.js`,
        types: `../../lib/typescript/components/${folder}/index.d.ts`,
        author: 'Thet Aung <thetaung.dev@gmail.com>',
        license: 'MIT',
        sideEffects: false,
    };

    fs.writeFileSync(path.join(componentDir, 'package.json'), JSON.stringify(packageJson, null, 2));
});
