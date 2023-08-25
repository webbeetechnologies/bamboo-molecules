import { createContext, useContext } from 'react';
import { registerPortalContext } from '../../../src';
import { Portal } from '../../../src/components';
import { useMolecules } from '../../common';
import { StyleSheet } from 'react-native';

export type Props = {};

const NumberContext = createContext(10);
const StringContext = createContext('Hello World');

registerPortalContext(NumberContext);

const ChildComponent = ({ text }: { text: string }) => {
    const number = useContext(NumberContext);
    const string = useContext(StringContext);
    const { View, Text } = useMolecules();
    return (
        <View>
            <Text style={styles.muted}>numberContext (bridged): {number}</Text>
            <Text style={styles.muted}>stringContext (not bridged): {string}</Text>
            <Text>{text}</Text>
        </View>
    );
};

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <>
            <View style={styles.default}>
                <Text style={styles.muted}>
                    numberContext (default): {useContext(NumberContext)}
                </Text>
                <Text style={styles.muted}>
                    stringContext (default): {useContext(StringContext)}
                </Text>
                <Text>Default Values of context without bridging</Text>
            </View>
            <NumberContext.Provider value={42}>
                <StringContext.Provider value={'Hola!'}>
                    <View style={styles.container}>
                        <ChildComponent text="This child is placed in the parent div." />
                        <Portal {...props}>
                            <View style={styles.default}>
                                <ChildComponent text="This child is rendered outside of the root parent" />
                            </View>
                        </Portal>
                    </View>
                </StringContext.Provider>
            </NumberContext.Provider>
        </>
    );
};

const styles = StyleSheet.create({
    default: {
        width: 400,
        marginBottom: 'spacings.4',
    },
    container: {
        width: 400,
        padding: 'spacings.4',
        borderWidth: 1,
        borderColor: 'colors.primary',
        marginBottom: 'spacings.4',
        borderRadius: 'shapes.corner.small' as unknown as number,
    },
    muted: {
        opacity: 0.5,
    },
});
