import { StyleSheet } from 'react-native';
import { useMolecules } from '../../../src';
import { Surface, SurfaceProps } from '../../../src/components';

export type Props = SurfaceProps & {};

export const Example = (props: Props) => {
    const { Text } = useMolecules();

    return (
        <Surface style={styles.surface} {...props}>
            <Text>Surface</Text>
        </Surface>
    );
};

const styles = StyleSheet.create({
    surface: {
        width: 100,
        height: 100,
        backgroundColor: 'colors.surface',
    },
});
