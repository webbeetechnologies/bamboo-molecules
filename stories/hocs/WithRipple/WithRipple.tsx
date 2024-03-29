import { StyleSheet } from 'react-native';
import { ProvideMolecules, useMolecules, withRipple, TouchableRippleProps } from '../../../src';
import type { PressableProps } from '@bambooapp/bamboo-atoms';

export type Props = PressableProps & TouchableRippleProps;

export const RippleView = withRipple(({ children, ...rest }: Props) => {
    const { Text, Pressable } = useMolecules();

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
