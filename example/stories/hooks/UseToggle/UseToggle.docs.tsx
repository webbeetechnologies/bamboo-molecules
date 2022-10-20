import React from 'react';
import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>useToggle Hook</H1>
            <Text>
                useToggle is a simple hook that can make our lives easier when dealing with
                toggleable components like Checkbox, Switch, Modal, etc.
                {'\n'}
                It returns an array with 2 values, current state and the toggle function. The state
                can be toggled with the toggle function.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useMolecules, useToggle } from 'bamboo-molecules';

export const Components = () => {
    const { View, Text, Switch } = useMolecules();
    const [isToggled, toggleSwitch] = useToggle();

    return (
        <View>
            <Text>Toggleable Switch</Text>
            <Switch value={isToggled} onValueChange={toggleSwitch} />
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
