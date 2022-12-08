import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000005',

    padding: 10,
    position:'relative'
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  itemsCenter: {
    alignItems: 'center',
  },
});

export const colors = {
  black:'#000000',
  white:'#ffffff',
  red:'#FC5757',
  primary:'#1868ae'
}

export default styles;
