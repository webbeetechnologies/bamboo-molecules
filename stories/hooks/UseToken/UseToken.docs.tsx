import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>useToken Hook</H1>
            <Text>
                useToken accepts a string for a token and return the normalized value. if the token
                doesn't exist, it will return undefined.
            </Text>
            <Text>
                Internally, useTokens uses the current theme and thus it will normalize all sorts of
                tokens, including color, and will update when the theme changes.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useToken, useMolecules } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text } = useMolecules();
    const color = useToken("colors.primary50");


    return (
        <View>
            <Text>Resolved token: {color}</Text>
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
