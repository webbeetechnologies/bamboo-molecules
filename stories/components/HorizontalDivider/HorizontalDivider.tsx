import { useMolecules } from '../../../src';
import { HorizontalDivider, HorizontalDividerProps } from '../../../src/components';

export type Props = HorizontalDividerProps & {};

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <View>
            <Text>Above</Text>
            <HorizontalDivider spacing={10} {...props} />
            <Text>Below</Text>
        </View>
    );
};
