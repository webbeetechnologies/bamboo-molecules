import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { useMolecules } from '../../../src';
import { TouchableRipple, TouchableRippleProps } from '../../../src/components';

export type Props = TouchableRippleProps & {};

export const Example = (props: Props) => {
    const { Text } = useMolecules();
    const onPress = useCallback(() => {}, []);

    return (
        <TouchableRipple style={styles.container} onPress={onPress} {...props}>
            <Text>Touchable Ripple</Text>
        </TouchableRipple>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        backgroundColor: 'colors.surface',
    },
});
