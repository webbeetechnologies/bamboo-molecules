import { memo, useMemo } from 'react';
import type { FieldRendererProps } from '../../types';
import { CheckboxProps, useMolecules } from '@bambooapp/bamboo-molecules';

import type { Value } from './types';
import { StyleSheet } from 'react-native';

export type Props = FieldRendererProps<Value> & Omit<CheckboxProps, 'value'> & {};

const CheckboxEditorRenderer = ({ value, style, ...rest }: Props) => {
    const { Checkbox, View } = useMolecules();

    const containerStyle = useMemo(() => [styles.container, style], [style]);

    return (
        <View style={containerStyle}>
            <Checkbox value={!!value} size="sm" {...rest} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignSelf: 'flex-start',
    },
});

export default memo(CheckboxEditorRenderer);
