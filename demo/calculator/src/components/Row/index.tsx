import { StyleSheet } from 'react-native';
import { useMolecules, ViewProps } from 'bamboo-molecules';

const Row = ({ children, ...rest }: ViewProps) => {
    const { View } = useMolecules();
    return (
        <View style={styles.container} {...rest}>
            {children}
        </View>
    );
};

// create styles of Row
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
});

export default Row;
