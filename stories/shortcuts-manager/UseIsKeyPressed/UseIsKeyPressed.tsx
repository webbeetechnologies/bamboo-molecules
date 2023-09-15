import { useMolecules, isMac } from '../../../src';
import { ShortcutsManager, Shortcut, useIsKeyPress } from '../../../src/shortcuts-manager';
import { StyleSheet, TextStyle } from 'react-native';

const MetaKey = isMac() ? 'Meta' : 'Control';

export const ExampleWithoutProvider = () => {
    const { View, Text } = useMolecules();
    const isShiftKeyPressed = useIsKeyPress('Shift');
    const isControlOrMetaKeyPress = useIsKeyPress(MetaKey);
    const isAltKeyPressed = useIsKeyPress('Alt');

    return (
        <>
            {/* @ts-ignore */}
            <View focusable style={styles.container}>
                <Text>
                    isShiftKeyPressed: <Text style={styles.text}>{String(isShiftKeyPressed)}</Text>
                </Text>
                <Text>
                    isControlOrMetaKeyPress:{' '}
                    <Text style={styles.text}>{String(isControlOrMetaKeyPress)}</Text>
                </Text>
                <Text>
                    isAltKeyPressed: <Text style={styles.text}>{String(isAltKeyPressed)}</Text>
                </Text>
            </View>
        </>
    );
};

const shortcuts: Shortcut[] = [];

export const Example = () => {
    return (
        <ShortcutsManager shortcuts={shortcuts}>
            <ExampleWithoutProvider />
        </ShortcutsManager>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
    title: {
        typescale: 'typescale.labelLarge' as unknown as number,
    } as TextStyle,
    text: {
        typescale: 'typescale.titleMedium' as unknown as number,
        marginVertical: 'spacings.4',
    } as TextStyle,
    button: {
        marginTop: 'spacings.2',
    },
});
