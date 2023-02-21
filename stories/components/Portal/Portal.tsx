import { Portal, PortalProps } from '../../../src/components';
import { useMolecules } from '../../common';
import { StyleSheet } from 'react-native';

export type Props = PortalProps & {};

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <View style={styles.container}>
            <Text>This child is placed in the parent div.</Text>

            <Portal {...props}>
                <Text>This child is rendered outside of the root parent</Text>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 'spacings.4',
        borderWidth: 1,
        borderColor: 'colors.primary',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
});
