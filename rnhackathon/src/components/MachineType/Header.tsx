import React, { memo } from 'react';
import { ActionTypes, MachinesType } from '../../store/types';
import styles, { colors } from '../../styles';
import { useDispatch } from 'react-redux';
import { useMolecules } from '../../../App';

interface Props {
    machine_type: MachinesType;
}

const containerStyle = [
    styles.row,
    styles.spaceBetween,
    {
        paddingVertical: 10,
        marginBottom: 5,
        borderBottomWidth: 1,
        borderColor: colors.black + '10',
    },
];
const titleStyle = { color: colors.black };

const Header = ({ machine_type }: Props) => {
    const { View, Button, Text } = useMolecules();
    const dispatch = useDispatch();

    const onAdd = React.useCallback(() => {
        dispatch({
            type: ActionTypes.ADD_MACHINE,
            payload: {
                machine_type_id: machine_type.id,
            },
        });
    }, [machine_type.id]);

    return (
        <View style={containerStyle}>
            <Text style={titleStyle}>{machine_type.name}</Text>
            <Button iconName="plus" variant="contained" onPress={onAdd}>
                ADD
            </Button>
        </View>
    );
};

export default memo(Header);
