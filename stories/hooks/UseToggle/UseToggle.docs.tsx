import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text, Code } = useMolecules();

    return (
        <View>
            <H1>useToggle Hook</H1>
            <Text>
                useToggle is a simple hook that can make our lives easier when dealing with
                toggleable components like Checkbox, Switch, Modal, etc.
                {'\n'}
                It returns an object with 3 properties, current <Code>state</Code>, the{' '}
                <Code>onToggle</Code> function, the
                <Code>setState</Code> function. The state can be toggled with the toggle function.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useMolecules, useToggle } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text, Switch } = useMolecules();
    const { state: isToggled, onToggle } = useToggle();

    return (
        <View>
            <Text>Toggleable Switch</Text>
            <Switch value={isToggled} onValueChange={onToggle} />
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
