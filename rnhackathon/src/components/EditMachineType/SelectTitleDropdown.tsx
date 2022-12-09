import React, { memo, useCallback, useMemo } from 'react';

import { ActionTypes, MachineTypesFields } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useMolecules } from '../../../App';
import { SelectDropdown } from '../SelectDropdown';

interface Props {
    filtered_machine_types_fields: MachineTypesFields[];
    getTitle: string;
    machine_type_id: string;
}

const SelectTitleDropdown = ({
    filtered_machine_types_fields,
    getTitle,
    machine_type_id,
}: Props) => {
    const { View } = useMolecules();
    const dispatch = useDispatch();

    const fields = useMemo(() => {
        return filtered_machine_types_fields.map((fmtf: MachineTypesFields) => ({
            id: fmtf.id,
            text: fmtf.name,
        }));
    }, [filtered_machine_types_fields]);

    const onChange = useCallback(
        (item: { id: string; text: string }) => {
            dispatch({
                type: ActionTypes.UPDATE_MACHINE_TYPE,
                payload: {
                    id: machine_type_id,
                    property: 'title_id',
                    value: item.id,
                },
            });
        },
        [machine_type_id],
    );

    return (
        <View style={{ marginBottom: 20 }}>
            <SelectDropdown
                variant="outlined"
                label={getTitle}
                data={fields}
                // @ts-ignore
                onChange={onChange}
            />
        </View>
    );
};

export default memo(SelectTitleDropdown);
