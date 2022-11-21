import { memo } from 'react';
import { StyleSheet } from 'react-native';
import { nanoid } from 'nanoid';
import { useMolecules } from 'bamboo-molecules';
import { format } from 'date-fns';
import type { Machine, MachinesAttributeValues, MachineTypeField } from '../../store';

export type AttributeInputProps = {
    field: MachineTypeField;
    machine: Machine;
    onChange: (value: MachinesAttributeValues, fieldId: string, refId: string) => void;
};

const AttributeValueInput = ({ field, machine, onChange }: AttributeInputProps) => {
    const { id, label, type } = field;
    const selectedField = machine.fields.find(item => item.refId === id) || {
        id: nanoid(),
        refId: id,
        value: '',
    };

    const { TextInput, NumberInput, DatePickerInput, Checkbox, View, Label } = useMolecules();

    switch (type) {
        case 'text':
            return (
                <TextInput
                    style={styles.input}
                    label={label}
                    value={selectedField.value as string}
                    onChangeText={text => onChange(text, selectedField.id, id)}
                />
            );
        case 'number':
            return (
                <NumberInput
                    style={styles.input}
                    label={label}
                    value={selectedField.value as string}
                    onChangeText={number => onChange(number, selectedField.id, id)}
                />
            );

        case 'date':
            return (
                <DatePickerInput
                    style={styles.input}
                    inputMode={'start'}
                    value={
                        selectedField.value ? new Date(selectedField.value as string) : undefined
                    }
                    onChange={date => {
                        onChange(
                            format(new Date(date as Date), 'MM-dd-yyyy'),
                            selectedField.id,
                            id,
                        );
                    }}
                />
            );
        case 'checkbox':
            return (
                <View style={styles.input}>
                    <Checkbox
                        style={styles.checkbox}
                        status={
                            selectedField.value === undefined
                                ? 'indeterminate'
                                : selectedField.value
                                ? 'checked'
                                : 'unchecked'
                        }
                        onChange={() => onChange(!selectedField.value, selectedField.id, id)}
                    />
                    <Label style={styles.label}>{label}</Label>
                </View>
            );
        default:
            return <TextInput style={styles.input} />;
    }
};

const styles = StyleSheet.create({
    input: {
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        marginRight: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
    },
});

export default memo(AttributeValueInput);
