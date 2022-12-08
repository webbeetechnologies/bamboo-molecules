import { useMolecules } from '../../../App';
import React, { memo, useMemo, useCallback } from 'react';
import styles from '../../styles';
import type { FieldProps } from './types';

const CheckboxField = ({ name, value, onChange }: FieldProps) => {
    const {Text,Checkbox,View} = useMolecules();
    const label = useMemo(() => (name === '' ? 'Unnamed Field' : name), [name]);

    const status = useMemo(() => (value === 'true' ? 'checked' : 'unchecked'), [value]);

    const onToggle = useCallback(() => {
        onChange(value === 'true' ? 'false' : 'true');
    }, [value]);

    return (
        <View style={[styles.row, styles.itemsCenter, styles.spaceBetween, { paddingVertical: 5 }]}>
            <Text style={{ fontSize: 20 }}>
                {label}
            </Text>
            <Checkbox status={status} onPress={onToggle} />
        </View>
    );
};

export default memo(CheckboxField);
