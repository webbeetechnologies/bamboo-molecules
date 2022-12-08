import React, {useState, useCallback, useMemo, memo} from 'react';

import {Button} from 'react-native-paper';

// import DatePicker from 'react-native-date-picker';
import {colors} from '../../styles';
import type {FieldProps} from './types';

const btnStyle = {width: '100%'};

const DateField = ({name, value, onChange}: FieldProps) => {
  const [visibleDatePicker, setvisibleDatePicker] = useState(false);

  const label = useMemo(
    () => (name === '' ? `Unnamed Field: ${value}` : `${name}: ${value}`),
    [name, value],
  );

  const onConfirm = useCallback((date: Date) => {
    setvisibleDatePicker(false);
    onChange(
      date.getFullYear() +
        '-' +
        (date.getMonth() + 1).toString().padStart(2, '0') +
        '-' +
        date.getDate().toString().padStart(2, '0'),
    );
  }, []);

  const onToggle = useCallback(() => {
    setvisibleDatePicker(prev => !prev);
  }, []);

  return (
    <>
      {/* <DatePicker
        modal
        mode="date"
        open={visibleDatePicker}
        date={value ? new Date(value) : new Date()}
        onConfirm={onConfirm}
        onCancel={onToggle}
      /> */}
      <Button
        icon="calendar-month"
        mode="outlined"
        onPress={onToggle}
        style={btnStyle}
        textColor={colors.primary}>
        {label}
      </Button>
    </>
  );
};

export default memo(DateField);
