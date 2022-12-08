import { useMolecules } from '../../../App';
import React, { memo, useMemo } from 'react';
import type { FieldProps } from './types';

const InputField = ({ type = 'default', name, value, onChange }: FieldProps) => {
    const { TextInput } = useMolecules();
    const label = useMemo(() => (name === '' ? 'Unnamed Field' : name), [name]);

    return (
        <TextInput
            keyboardType={type}
            variant="outlined"
            label={label}
            value={value}
            onChangeText={text => onChange(text)}
            style={{ marginBottom: 5 }}
        />
    );
};

export default memo(InputField);
