import { FC, useCallback, memo } from 'react';
import { StyleSheet } from 'react-native';
import { nanoid } from 'nanoid';
import { useDispatch } from 'react-redux';
import { useMolecules } from 'bamboo-molecules';

import {
    MachinesAttributeTypes,
    MachineType,
    MachineTypeField,
    createAttribute,
    deleteMachineType,
    deleteAttribute,
    removeFieldInEachMachine,
    removeAllMachinesUnderOneType,
    updateAttribute,
    updateMachineTypeName,
    updateMachineTypeTitle,
} from '../../features';

interface MachineTypeCardProps {
    machineType: MachineType;
}

const MachineTypeCard: FC<MachineTypeCardProps> = ({ machineType }) => {
    const { id, name, title, fields } = machineType;
    const {
        Surface,
        View,
        IconButton,
        TextInput,
        Text,
        Button,
        Label,
        DropdownList,
        ListItem,
        InputGroup,
    } = useMolecules();
    const dispatch = useDispatch();

    const onNameChange = useCallback(
        (text: string) => {
            dispatch(updateMachineTypeName({ machineTypeId: id, name: text }));
        },
        [dispatch, id],
    );

    const onTitleChange = useCallback(
        (titleFieldIld: string) => {
            dispatch(updateMachineTypeTitle({ machineTypeId: id, title: titleFieldIld }));
        },
        [dispatch, id],
    );

    const onInputAttrChange = useCallback(
        (value: string, field: MachineTypeField) => {
            if (value === 'remove') {
                dispatch(
                    deleteAttribute({
                        machineTypeId: id,
                        fieldId: field.id,
                    }),
                );
                dispatch(
                    removeFieldInEachMachine({
                        refId: field.id,
                    }),
                );
            } else {
                dispatch(
                    updateAttribute({
                        machineTypeId: id,
                        field: {
                            ...field,
                            type: value as MachinesAttributeTypes,
                        },
                    }),
                );
            }
        },
        [dispatch, id],
    );

    const onAddNewField = useCallback(
        (type: MachinesAttributeTypes) => {
            dispatch(
                createAttribute({
                    machineTypeId: id,
                    field: {
                        id: nanoid(),
                        type,
                        label: '',
                    },
                }),
            );
        },
        [dispatch, id],
    );

    const onFieldLabelChange = useCallback(
        (text: string, field: MachineTypeField) => {
            dispatch(
                updateAttribute({
                    machineTypeId: id,
                    field: {
                        ...field,
                        label: text,
                    },
                }),
            );
        },
        [dispatch, id],
    );

    const onDeleteMachineType = useCallback(() => {
        dispatch(deleteMachineType(id));
        dispatch(removeAllMachinesUnderOneType({ machineTypeId: id }));
    }, [dispatch, id]);

    return (
        <Surface style={styles.card}>
            <View style={styles.header}>
                <Text style={styles.headerTexts}>{name}</Text>
                <IconButton name="delete" onPress={onDeleteMachineType} />
            </View>
            <View style={styles.body}>
                <View style={styles.inputGroup}>
                    <TextInput
                        style={styles.input}
                        label="Machine Name"
                        value={name}
                        onChangeText={onNameChange}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Label style={styles.label}>Machine Title</Label>
                    <DropdownList
                        containerStyle={styles.titlePopover}
                        trigger={props => (
                            <Button
                                {...props}
                                variant="contained-tonal"
                                iconName="chevron-down"
                                style={styles.titleSelect}>
                                {(fields.find(item => item.id === title) || {})?.label}{' '}
                            </Button>
                        )}
                        records={[{ data: fields }]}
                        renderItem={({ item }) => (
                            <ListItem onPress={() => onTitleChange(item.id)}>{item.label}</ListItem>
                        )}
                    />
                </View>

                <View style={styles.fieldsContainer}>
                    <Label style={styles.label}>Fields</Label>
                    {fields.map(field => (
                        <InputGroup style={styles.inputGroup} key={field.id}>
                            <TextInput
                                label="Attribute Label"
                                value={field.label}
                                onChangeText={text => onFieldLabelChange(text, field)}
                                containerStyle={{ flex: 1 }}
                            />
                            <DropdownList
                                containerStyle={styles.btnPopover}
                                trigger={props => (
                                    <Button
                                        {...props}
                                        variant="contained-tonal"
                                        iconName="chevron-down"
                                        size="sm"
                                        style={{ flex: 1 }}>
                                        {field.type}
                                    </Button>
                                )}
                                records={inputOptions}
                                renderItem={({ item }) => (
                                    <ListItem onPress={() => onInputAttrChange(item.type, field)}>
                                        {item.type}
                                    </ListItem>
                                )}
                            />
                        </InputGroup>
                    ))}
                </View>

                <DropdownList
                    containerStyle={styles.btnPopover}
                    trigger={props => (
                        <Button
                            {...props}
                            variant="contained-tonal"
                            style={styles.btn}
                            iconName="chevron-down">
                            Add Field
                        </Button>
                    )}
                    records={attributeOptions}
                    renderItem={({ item }) => (
                        <ListItem onPress={() => onAddNewField(item.type)}>
                            <ListItem.Title>{item.type}</ListItem.Title>
                        </ListItem>
                    )}
                />
            </View>
        </Surface>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 4,
        backgroundColor: '#f8f8f8',
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
    },
    headerTexts: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10,
        fontSize: 16,
        fontWeight: '600',
    },
    body: {
        borderBottomRightRadius: 4,
        borderBottomLeftRadius: 4,
        padding: 20,
    },
    fieldsContainer: {
        marginTop: 10,
    },
    inputGroup: {
        marginVertical: 10,
    },
    titleSelect: {
        marginTop: 5,
    },
    input: {},
    btn: {
        marginTop: 20,
    },
    btnPopover: {
        minWidth: 150,
        backgroundColor: '#fff',
    },
    titlePopover: {
        minWidth: 200,
        backgroundColor: '#fff',
    },
    selectInput: {},
    label: {
        fontWeight: '600',
        marginBottom: 5,
    },
});

const attributeOptions = [
    {
        data: [
            {
                id: 1,
                type: 'text',
            },
            {
                id: 2,
                type: 'number',
            },
            {
                id: 3,
                type: 'date',
            },
            {
                id: 4,
                type: 'checkbox',
            },
        ],
    },
];

const inputOptions = [
    {
        data: [
            {
                id: 1,
                type: 'text',
            },
            {
                id: 2,
                type: 'number',
            },
            {
                id: 3,
                type: 'date',
            },
            {
                id: 4,
                type: 'checkbox',
            },
            {
                id: 5,
                type: 'remove',
            },
        ],
    },
];

export default memo(MachineTypeCard);
