import React from 'react';
import { useDispatch } from 'react-redux';
import { ActionTypes } from '../../store/types';
import { useMolecules } from '../../../App';

interface Props {
    machine_id: string;
    title: string;
}

const containerStyle = {
    flexDirection: 'row' as 'row',
    justifyContent: 'space-between' as 'space-between',
    alignItems: 'center' as 'center',
    marginBottom: 15,
};

const Header = ({ title, machine_id }: Props) => {
    const { Button, SuperText ,View} = useMolecules();
    const dispatch = useDispatch();

    const onDelete = React.useCallback(() => {
        dispatch({
            type: ActionTypes.DELETE_MACHINE,
            payload: { id: machine_id },
        });
    }, [machine_id]);

    return (
        <View style={containerStyle}>
            <SuperText sizes='h6'>{title}</SuperText>
            <Button
                iconName="trash-can-outline"
                variant="text"
                onPress={onDelete}
                textColor={'colors.error'}>
                DELETE
            </Button>
        </View>
    );
};

export default Header;
