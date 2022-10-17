import { useMolecules, HorizontalDividerProps } from 'bamboo-molecules';

export type Props = HorizontalDividerProps & {};

export const Example = (props: Props) => {
    const { HorizontalDivider, View, Text } = useMolecules();

    return (
        <View>
            <Text>Above</Text>
            <HorizontalDivider spacing={10} {...props} />
            <Text>Below</Text>
        </View>
    );
};
