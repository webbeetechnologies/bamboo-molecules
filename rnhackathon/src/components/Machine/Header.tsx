import React from 'react';
import styles, {colors} from '../../styles';
import {View} from 'react-native';
import {useDispatch} from 'react-redux';
import {Text, Button} from 'react-native-paper';
import {ActionTypes} from '../../store/types';

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
        variant="bodyLarge"
        style={{marginBottom: 5, fontWeight: '700', fontSize: 20}}>
        {title}
      </Text>
      <Button
        icon="trash-can-outline"
        mode="text"
        onPress={onDelete}
        style={{alignSelf: 'flex-end'}}
        textColor={colors.red}
        compact>
        DELETE
      </Button>
    </View>
  );
};

export default Header;
