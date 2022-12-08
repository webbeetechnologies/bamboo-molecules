import React, {memo, useMemo} from 'react';
import {TextInput} from 'react-native-paper';
import type {FieldProps} from './types';

const InputField = ({type = 'default', name, value, onChange}: FieldProps) => {
  const label = useMemo(() => (name === '' ? 'Unnamed Field' : name), [name]);

  return (
    <TextInput
      keyboardType={type}
      mode="outlined"
      label={label}
      value={value}
      onChangeText={text => onChange(text)}
      style={{marginBottom: 5}}
    />
  );
};

export default memo(InputField);
