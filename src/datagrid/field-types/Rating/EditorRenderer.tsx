import { memo } from 'react';
import type { RatingProps } from '../../../components';
import { useMolecules } from '../../../hooks';
import type { FieldRendererProps } from '../../types';
import type { Value } from './types';
import { StyleSheet } from 'react-native';

export type Props = FieldRendererProps<Value> & RatingProps & {};

const RatingFieldEditorRenderer = ({ value, onChange, count, color, readonly, ...rest }: Props) => {
    const { View, Rating } = useMolecules();

    return (
        <View style={styles.container} {...rest}>
            <Rating
                {...rest}
                value={value || 0}
                count={count}
                color={color}
                onChange={onChange}
                readonly={readonly}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
});

export default memo(RatingFieldEditorRenderer);
