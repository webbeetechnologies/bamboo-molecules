import { useMolecules } from '../../../src';
import { VerticalDivider, VerticalDividerProps } from '../../../src/components';
import { StyleSheet } from 'react-native';

export type Props = VerticalDividerProps & {};

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <View style={styles.container}>
            <Text>Left</Text>
            <VerticalDivider bold spacing={10} {...props} />
            <Text>Right</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});
