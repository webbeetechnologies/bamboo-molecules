import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ProvideMolecules, useMolecules, withRipple, TouchableRippleProps } from '../../../src';

export type Props = PressableProps & TouchableRippleProps;

export const RippleView = withRipple(({ children, ...rest }: Props) => {
    const { Text } = useMolecules();

    return (
        <Pressable {...(rest as any)}>
            <Text selectable={false}>{children}</Text>
        </Pressable>
    );
});

export const Example = () => {
    return (
        <ProvideMolecules>
            <RippleView onPress={() => {}} style={styles.rippleView}>
                Clickable View
            </RippleView>
        </ProvideMolecules>
    );
};

const styles = StyleSheet.create({
    rippleView: {
        width: 200,
        height: 100,
        backgroundColor: '#f1f1f1',
    },
});
