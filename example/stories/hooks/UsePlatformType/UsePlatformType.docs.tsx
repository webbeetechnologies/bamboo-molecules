import React from 'react';
import { useMolecules } from 'bamboo-molecules';
import { Source } from '@storybook/addon-docs';
import { InjectedComponentTypes, withDocsWrapper } from '../../common';

const DocsPage = () => {
    const { View, H1, Text, Strong } = useMolecules<InjectedComponentTypes>();

    return (
        <View>
            <H1>usePlatformType Hook</H1>
            <Text>
                usePlatformType is a simple hook that returns current platform for the mobile and
                for the Web, the selected platform type inside the ThemeProvider (if not selected,
                the default styles will be MD3 styles).
            </Text>
            <Text>
                This hooks is mostly used internally in Molecules and Molecules components base
                their styles from the platformType. For the Web, if the PlatformType is selected as{' '}
                <Strong>android</Strong>, we provide MD3 based components and if the PlatformType is
                selected as <Strong>ios</Strong>, we provide Cupertino based components.
            </Text>
            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, usePlatformType, useMolecules } from 'bamboo-molecules';

export const Example = () => {
    const platformType = usePlatformType();
    const { Text } = useMolecules();

    return <Text>PlatformType: {platformType}</Text>;
};

export const App = () => {
    return (
        <ProvideMolecules>
            <Example />
        </ProvideMolecules>
    );
};
`;

export default withDocsWrapper(DocsPage);
