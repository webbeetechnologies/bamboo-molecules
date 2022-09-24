import React from 'react';
import { useMolecules } from 'bamboo-molecules';
import { Source } from '@storybook/addon-docs';
import { InjectedComponentTypes, withDocsWrapper } from '../../common';

const DocsPage = () => {
    const { View, H1, H3, Text, Code, Strong } = useMolecules<InjectedComponentTypes>();

    return (
        <View>
            <H1>Theme Provider</H1>
            <Text>
                Molecules Theme Provider is extended for <Code>bamboo-atoms</Code>' Theme Provider.
                {'\n'}
                It provides all the functionalities that <Code>bamboo-atoms</Code>' Theme Provider
                provides and more.
            </Text>

            <Text>
                It includes the <Code>Design Tokens.</Code>
                {'\n'}
                According to MD3 docs, . . .{'\n'}
                <Strong>
                    Design tokens represent the small, repeated design decisions that make up a
                    design system's visual style. Tokens replace static values, such as hex codes
                    for color, with self-explanatory names.
                </Strong>
            </Text>

            <Text>
                We provided a way to store the design tokens in the <Code>Theme Context</Code>,
                replace the existing ones, extend them, or create a new ones.
                {'\n'}
                We also provide the way to normalize the design tokens with a hook,{' '}
                <Code>useComponentTheme</Code>, or with a function, <Code>normalizeStyles</Code>
            </Text>

            <H3>Design Tokens</H3>
            <Text>
                Here is the example of to use the design tokens, inside the Theme or with the style
                props.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
// TODO add examples with our own components when they're created
`;

export default withDocsWrapper(DocsPage);
