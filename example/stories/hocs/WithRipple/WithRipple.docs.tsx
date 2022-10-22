import React from 'react';
import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text } = useMolecules();

    return (
        <View>
            <H1>withRipple HOC</H1>
            <Text>
                withRipple wraps the component around with TouchableRipple component. {'\n'}
                Which can be very useful when creating interactive components like IconButtons or
                MenuItems
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useMolecules, withRipple, TouchableRippleProps } from 'bamboo-molecules';

type Props = Omit<TouchableRippleProps, 'children'> & {};

export const RippleView = withRipple((props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <View {...props}>
            <Text selectable={false}>Clickable View</Text>
        </View>
    );
});

// App.tsx
export const App = () => {
    return (
        <ProvideMolecules>
            <RippleView onPress={() => {}} />
        </ProvideMolecules>
    );
};

`;

export default withDocsWrapper(DocsPage);
