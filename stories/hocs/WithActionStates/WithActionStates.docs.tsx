import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text, Code } = useMolecules();

    return (
        <View>
            <H1>withActionStates HOC</H1>
            <Text>
                withActionStates passes down ActionState props provided by the{' '}
                <Code>Pressable</Code> Component from <Code>react-native</Code>/
                <Code>react-native-web</Code> depending on the platform.
            </Text>
            <Text>
                For the Web, it passes down 3 props - <Code>pressed</Code>, <Code>hovered</Code>,
                and <Code>focused</Code>. And for the mobile - <Code>pressed</Code> prop.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import type { ViewProps } from 'react-native';
import {
    ProvideMolecules,
    useMolecules,
    CallbackActionState,
    withActionState,
} from 'bamboo-molecules';

type Props = ViewProps & CallbackActionState & {};

export const Components = withActionState(({ hovered, pressed, focused }: Props) => {
    const { View, Text, Strong, HorizontalDivider } = useMolecules();

    return (
        <View>
            <Text>Current states - </Text>
            <HorizontalDivider spacing={10} />
            <Text>
                pressed <Strong>{pressed ? 'true' : 'false'}</Strong>
            </Text>
            <HorizontalDivider spacing={10} />
            <Text>
                focused <Strong>{focused ? 'true' : 'false'}</Strong>
            </Text>
            <HorizontalDivider spacing={10} />
            <Text>
                hovered <Strong>{hovered ? 'true' : 'false'}</Strong>
            </Text>
        </View>
    );
});

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
