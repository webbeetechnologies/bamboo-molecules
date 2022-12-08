import React, { memo, useCallback, useMemo } from 'react';

import { colors } from '../../styles';
// import SelectDropdown from 'react-native-select-dropdown';
import { ActionTypes, MachinesType, MachineTypesFields } from '../../store/types';
import { useDispatch } from 'react-redux';
import Header from './Header';
import Listing from './Listing';
import { useMolecules } from 'App';

interface Props {
    machine_type: MachinesType;

    filtered_machine_types_fields: MachineTypesFields[];
}

const style = {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
};

const EditMachineType = ({
    machine_type,

    filtered_machine_types_fields,
}: Props) => {
    const { View } = useMolecules();

    const getTitle = useMemo(() => {
        const field = filtered_machine_types_fields.find(
            (val: MachineTypesFields) => val.id === machine_type.title_id,
        );

        if (field) {
            return 'TITLE FIELD: ' + field.name;
        }
        return 'TITLE FIELD: UNNAMED';
    }, [machine_type.title_id, filtered_machine_types_fields]);

    return (
        <View style={style}>
            <Header machine_type={machine_type} />
            <Listing
                filtered_machine_types_fields={filtered_machine_types_fields}
                machine_type={machine_type}
            />
            <SelectTitleField
                filtered_machine_types_fields={filtered_machine_types_fields}
                getTitle={getTitle}
                machine_type_id={machine_type.id}
            />

            <AddFieldBtn machine_type_id={machine_type.id} />
        </View>
    );
};

export default memo(EditMachineType);

interface SelectTitleFieldProps {
    filtered_machine_types_fields: MachineTypesFields[];
    getTitle: string;
    machine_type_id: string;
}

const SelectTitleField = memo(
    ({ filtered_machine_types_fields, getTitle, machine_type_id }: SelectTitleFieldProps) => {
        const { View } = useMolecules();
        const dispatch = useDispatch();

        const fields = useMemo(() => {
            return filtered_machine_types_fields.map((fmtf: MachineTypesFields) => ({
                id: fmtf.id,
                name: fmtf.name,
            }));
        }, [filtered_machine_types_fields]);

        return (
            <View style={{ marginBottom: 20 }}>
                {/* <SelectDropdown
          buttonStyle={{
            borderColor: colors.primary,
            borderBottomWidth: 1,
          }}
          rowTextStyle={{fontSize: 16}}
          buttonTextStyle={{fontSize: 14}}
          defaultButtonText={getTitle}
          data={filtered_machine_types_fields}
          buttonTextAfterSelection={(selectedItem, index) => getTitle}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
          onSelect={(selectedItem, index) => {
            dispatch({
              type: ActionTypes.UPDATE_MACHINE_TYPE,
              payload: {
                id: machine_type_id,
                property: 'title_id',
                value: selectedItem.id,
              },
            });
          }}
        /> */}
            </View>
        );
    },
);

interface AddFieldBtnProps {
    machine_type_id: string;
}

const AddFieldBtn = memo(({ machine_type_id }: AddFieldBtnProps) => {
    const { Button } = useMolecules();
    const dispatch = useDispatch();

    const onAdd = useCallback(() => {
        dispatch({
            type: ActionTypes.ADD_MACHINE_TYPES_FIELD,
            payload: {
                name: '',
                machine_type_id: machine_type_id,
            },
        });
    }, [machine_type_id]);

    return (
        <Button
            iconName="plus"
            variant="text"
            style={{ alignSelf: 'center' }}
            textColor={colors.primary}
            onPress={onAdd}>
            ADD NEW FIELD
        </Button>
    );
});
