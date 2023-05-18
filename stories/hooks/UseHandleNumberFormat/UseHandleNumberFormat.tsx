import { useState } from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { useHandleNumberFormat } from '../../../src/hooks';
import type { NumberMaskConfig } from '../../../src/hooks/useHandleNumberFormat';

export type Props = {
    config: NumberMaskConfig;
};

export const Example = ({ config, ...rest }: Props) => {
    const [number, setNumber] = useState<number | null>(null);
    const numberInputProps = useHandleNumberFormat({
        ...rest,
        value: number,
        onChangeText: setNumber,
        config,
    });

    return <TextInput {...numberInputProps} style={styles.input} />;
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
