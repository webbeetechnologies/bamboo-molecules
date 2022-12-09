import React, { useCallback } from 'react';
import { ActionTypes, MachinesType } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useMolecules } from '../../../App';

interface Props {
    machine_type: MachinesType;
}

const containerStyle = {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    marginBottom: 15,
};

const Header = ({ machine_type }: Props) => {
    const { View, SuperText, Button } = useMolecules();
    const dispatch = useDispatch();

    const label = React.useMemo(
        () => (machine_type.name === '' ? 'Unnamed' : machine_type.name),
        [machine_type.name],
    );

    const onDelete = useCallback(() => {
        dispatch({
            type: ActionTypes.DELETE_MACHINE_TYPE,
            payload: {
                id: machine_type.id,
            },
        });
    }, [machine_type.id]);

    return (
        <View style={containerStyle}>
            <SuperText sizes='h4'>{label}</SuperText>
            <Button
                iconName="trash-can-outline"
                variant="text"
                textColor="colors.error"
                onPress={onDelete}>
                DELETE
            </Button>
        </View>
    );
};

export default React.memo(Header);
