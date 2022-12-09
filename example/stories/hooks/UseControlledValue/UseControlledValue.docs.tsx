import React from 'react';
import { Source } from '@storybook/addon-docs';
import { withDocsWrapper, useMolecules } from '../../common';

const DocsPage = () => {
    const { View, H1, Text, Code } = useMolecules();

    return (
        <View>
            <H1>useControlledValue Hook</H1>
            <Text>
                useControlledValue hook makes it easier to deal with input component that may have
                uncontrolled state.
                {'\n'}
                The behavior mimics the HTML's input component's controlled and uncontrolled states
            </Text>
            <Text>
                It accepts 4 arguments, <Code>value</Code>, <Code>defaultValue</Code>,{' '}
                <Code>onChange</Code>, <Code>disabled</Code>, and <Code>manipulateValue</Code>(for
                manipulating the input and output values, useful in the case like masking the
                value). All of them are optional.
            </Text>

            <Source language="tsx" code={firstCodeBlock} />
        </View>
    );
};

const firstCodeBlock = `
import { ProvideMolecules, useMolecules, useToggle } from 'bamboo-molecules';

export const CustomInput = ({ value: valueProp, onChangeText, defaultValue }: TextInputProps) => {
    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeText,
        defaultValue,
    });

    return (
        <TextInput
            value={value}
            onChangeText={onChange}
        />
    );
};
`;

export default withDocsWrapper(DocsPage);
