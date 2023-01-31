import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text, DocLink } = useMolecules();

    return (
        <View>
            <H1>useCurrentTheme Hook</H1>
            <Text>
                useComponentStyles hook is a simple hook that returns the current MD3 Theme which
                can be light theme or the dark theme from the provider based on the colorMode.
            </Text>
            <Text>MD3 Theme is a place where all the design tokens point too.</Text>
            <Text>
                To read more about MD3 Theme and the design tokens, please check the{' '}
                <DocLink href={{ idOrTitle: 'core/ProvideMolecules' }}>
                    ProvideMolecules docs.
                </DocLink>{' '}
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useCurrentTheme, useMolecules } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text } = useMolecules();
    const currentTheme = useCurrentTheme(); // these are all the references to the design tokens values that we use.

    return (
        <View>
            <Text>{JSON.stringify(currentTheme, null, 4)}</Text>
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
