import { FC, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules } from 'bamboo-molecules';

import { deleteMachine, updateMachine, Machine, MachinesAttributeValues } from '../../store';
import { useAppSelector, useAppDispatch } from '../../hooks';
import AttributeValueInput from '../AttributeValueInput/AttributeValueInput';

interface MachineCardProps {
    machine: Machine;
}

const MachineCard: FC<MachineCardProps> = ({ machine }) => {
    const { id, machineTypeId, fields } = machine;
    const { machineType } = useAppSelector(({ machinesState }) => ({
        machineType: machinesState.machineTypes.find(item => item.id === machineTypeId),
    }));

    const { IconButton, Surface, View, Text } = useMolecules();

    const dispatch = useAppDispatch();

    const title = useMemo(
        () => fields.find(item => item.refId === machineType?.title)?.value || 'No title',
        [fields, machineType?.title],
    );

    const onDeleteMachine = useCallback(() => dispatch(deleteMachine({ id })), [dispatch, id]);

    const onChange = useCallback(
        (value: MachinesAttributeValues, fieldId: string, refId: string) => {
            dispatch(
                updateMachine({
                    machine: {
                        id,
                        machineTypeId,
                        fields: fields.find(item => item.id === fieldId)
                            ? fields.map(item => (item.id === fieldId ? { ...item, value } : item))
                            : [...fields, { id: fieldId, refId, value }],
                    },
                }),
            );
        },
        [dispatch, fields, id, machineTypeId],
    );

    return (
        <Surface style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.headerTexts}>
                    {machineType?.name} -{' '}
                    {typeof title !== 'string' ? (title ? (title as Date)?.toJSON() : '') : title}
                </Text>
                <IconButton name="delete" onPress={onDeleteMachine} />
            </View>
            <View style={styles.body}>
                {machineType?.fields.map(field => (
                    <AttributeValueInput
                        key={field.id}
                        field={field}
                        machine={machine}
                        onChange={onChange}
                    />
                ))}
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 4,
        backgroundColor: ' #f8f8f8',
        marginVertical: 10,
    },
    header: {
        padding: 10,
        backgroundColor: '#f1f1f1',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopRightRadius: 4,
        borderTopLeftRadius: 4,
        fontSize: 20,
        fontWeight: '600',
    },
    headerTexts: {
        alignItem: 'center',
        marginRight: 10,
        fontSize: 15,
        fontWeight: '600',
    },
    body: {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        padding: 20,
    },
});

export default MachineCard;
