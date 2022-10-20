import React from 'react';
import { useMolecules } from 'bamboo-molecules';
import { Source } from '@storybook/addon-docs';
import { InjectedComponentTypes, withDocsWrapper } from '../../common';

const DocsPage = () => {
    const { View, H1, Text, Code } = useMolecules<InjectedComponentTypes>();

    return (
        <View>
            <H1>useMolecules Hook</H1>
            <Text>
                useMolecules is similar to <Code>bamboo-atoms</Code>' useComponentsHook.
                {'\n'}
                It provides the platform specific injected Molecule Components (cupertino/ md3
                style) for the mobile. And for the web, depending on the selected platform style in
                the MoleculesProvider (cupertino/ md3 style)
            </Text>
            <Text>Currently, we only support the md3 styles for the components.</Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useMolecules } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text } = useMolecules();

    return (
        <View>
            <Text>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dicta ea eius expedita
                nobis placeat quod, recusandae voluptatibus. Aperiam asperiores enim fugiat ipsam
            </Text>
        </View>
    );
};

// App.tsx
export const App = () => {
    return (
        <ProvideMolecules>
            <Components />
        </ProvideMolecules>
    );
};
`;

export default withDocsWrapper(DocsPage);
