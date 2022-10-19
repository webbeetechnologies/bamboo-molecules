import { ProvideMolecules, useMolecules, withRipple, TouchableRippleProps } from 'bamboo-molecules';

export type Props = Omit<TouchableRippleProps, 'children'> & {};

export const RippleView = withRipple((props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <View {...props}>
            <Text selectable={false}>Clickable View</Text>
        </View>
    );
});

export const Example = (props: Props) => {
    return (
        <ProvideMolecules>
            <RippleView onPress={() => {}} {...props} />
        </ProvideMolecules>
    );
};
