import React, { useCallback } from 'react';
import styles, { colors } from '../../styles';
import { ActionTypes, MachinesType } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useMolecules } from 'App';

interface Props {
    machine_type: MachinesType;
}
const Header = ({ machine_type }: Props) => {
    const { View, Text, Button } = useMolecules();
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
        <View style={[styles.row, styles.spaceBetween, styles.itemsCenter, { paddingBottom: 10 }]}>
            <Text style={{ marginBottom: 5, fontWeight: '700' }}>{label}</Text>
            <Button
                iconName="trash-can-outline"
                variant="text"
                style={{ alignSelf: 'flex-end' }}
                textColor={colors.red}
                onPress={onDelete}>
                DELETE
            </Button>
        </View>
    );
};

export default React.memo(Header);
