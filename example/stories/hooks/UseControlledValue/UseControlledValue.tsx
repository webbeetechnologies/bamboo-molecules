import { useState } from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { useControlledValue } from 'bamboo-molecules';

export type Props = TextInputProps & {
    disabled?: boolean;
};

export const Example = ({ value: valueProp, onChangeText, defaultValue, disabled }: Props) => {
    const [value, onChange] = useControlledValue({
        value: valueProp,
        onChange: onChangeText,
        defaultValue,
        disabled,
    });

    return (
        <TextInput
            value={value}
            onChangeText={onChange}
            testID="useControlledValue-input"
            style={styles.input}
            placeholder="enter"
        />
    );
};

export const ControlledExample = (props: Props) => {
    const [value, onValueChange] = useState('controlledInitialValue');

    return <Example value={value} onChangeText={onValueChange} {...props} />;
};

const styles = StyleSheet.create({
    input: {
        minHeight: 40,
        minWidth: 150,
        padding: 5,
        borderWidth: 1,
        borderColor: 'rgba(121, 116, 126, 1)',
        borderRadius: 4,
    },
});
