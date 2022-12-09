import { useMolecules } from '../../../App';
import React, { useState, useCallback, useMemo, memo } from 'react';
import type { FieldProps } from './types';

const containerStyle = {
    marginBottom: 'spacings.4',
};

const DateField = ({ name, value, onChange }: FieldProps) => {
    const { Button, DatePickerModal, View } = useMolecules();
    const [visibleDatePicker, setvisibleDatePicker] = useState(false);

    const label = useMemo(
        () => (name === '' ? `Unnamed Field: ${value}` : `${name}: ${value}`),
        [name, value],
    );

    const onConfirm = useCallback(({ date }: { date: Date | undefined }) => {
        setvisibleDatePicker(false);
        if (date) {
            onChange(
                date.getFullYear() +
                    '-' +
                    (date.getMonth() + 1).toString().padStart(2, '0') +
                    '-' +
                    date.getDate().toString().padStart(2, '0'),
            );
        }
    }, []);

    const onToggle = useCallback(() => {
        setvisibleDatePicker(prev => !prev);
    }, []);

    return (
        <View style={containerStyle}>
            <DatePickerModal
                mode="single"
                isOpen={visibleDatePicker}
                onConfirm={onConfirm}
                onClose={onToggle}
            />

            <Button
                iconName="calendar-month"
                variant="outlined"
                onPress={onToggle}
                style={btnStyle}>
                {label}
            </Button>
        </View>
    );
};

export default memo(DateField);
const btnStyle = { backgroundColor: 'colors.bg800', paddingVertical: 'spacings.1' };
