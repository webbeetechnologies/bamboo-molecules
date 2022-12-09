import { useMolecules } from '../../../App';
import React, { memo, useMemo, useCallback } from 'react';
import type { FieldProps } from './types';


const containerStyle = {
    flexDirection:'row' as 'row',
    justifyContent:'space-between' as 'space-between',
    alignItems:'center' as 'center',
    paddingBottom:'spacings.4',
   
}

const CheckboxField = ({ name, value, onChange }: FieldProps) => {
    const {SuperText,Checkbox,View} = useMolecules();
    const label = useMemo(() => (name === '' ? 'Unnamed Field' : name), [name]);

    const status = useMemo(() => (value === 'true' ? 'checked' : 'unchecked'), [value]);

    const onToggle = useCallback(() => {
        onChange(value === 'true' ? 'false' : 'true');
    }, [value]);

    return (
        <View style={containerStyle}>
            <SuperText sizes='rg'>
                {label}
            </SuperText>
            <Checkbox size='lg' status={status} onChange={onToggle}  />
        </View>
    );
};

export default memo(CheckboxField);
