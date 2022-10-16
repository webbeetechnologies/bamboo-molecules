import { useMolecules, VerticalDividerProps } from 'bamboo-molecules';

export type Props = VerticalDividerProps & {};

export const Example = (props: Props) => {
    const { VerticalDivider, View, Text } = useMolecules();

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text>Left</Text>
            <VerticalDivider bold spacing={10} {...props} />
            <Text>Right</Text>
        </View>
    );
};
