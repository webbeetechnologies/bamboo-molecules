import React, { memo } from 'react';
import { ActionTypes, MachinesType } from '../../store/types';
import { useDispatch } from 'react-redux';
import { useMolecules } from '../../../App';

interface Props {
    machine_type: MachinesType;
}


const containerStyle = {
    flexDirection:'row' as 'row',
    justifyContent:'space-between' as 'space-between',
    alignItems:'center' as 'center',
    paddingBottom:'spacings.1',
    marginBottom: 'spacings.1',
   
}




const Header = ({ machine_type }: Props) => {
    const { View, Button,SuperText } = useMolecules();
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
            <SuperText sizes='h3'>{machine_type.name}</SuperText>
            <Button iconName="plus" variant="contained" onPress={onAdd}>
                ADD
            </Button>
        </View>
    );
};

export default memo(Header);
