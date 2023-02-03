import { useMolecules } from '../../../src';
import { VerticalDivider, VerticalDividerProps } from '../../../src/components';

export type Props = VerticalDividerProps & {};

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text>Left</Text>
            <VerticalDivider bold spacing={10} {...props} />
            <Text>Right</Text>
        </View>
    );
};
