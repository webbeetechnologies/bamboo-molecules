import React from 'react';
import styles, {colors} from '../../styles';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {ActionTypes} from '../../store/types';
import { useMolecules } from '../../../App';

interface Props {
  machine_id: string;
  title: string;
}

const containerStyle = [
  styles.row,
  styles.spaceBetween,
  styles.itemsCenter,
  {paddingBottom: 10},
];

const Header = ({title, machine_id}: Props) => {
  const {Text, Button} = useMolecules()
  const dispatch = useDispatch();

  const onDelete = React.useCallback(() => {
    dispatch({
      type: ActionTypes.DELETE_MACHINE,
      payload: {id: machine_id},
    });
  }, [machine_id]);

  return (
    <View style={containerStyle}>
      <Text
        style={{marginBottom: 5, fontWeight: '700', fontSize: 20}}>
        {title}
      </Text>
      <Button
        iconName="trash-can-outline"
        variant="text"
        onPress={onDelete}
        style={{alignSelf: 'flex-end'}}
        textColor={colors.red}
        >
        DELETE
      </Button>
    </View>
  );
};

export default Header;
