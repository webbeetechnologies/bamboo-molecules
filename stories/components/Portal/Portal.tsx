import { Portal } from '../../../src/components';
import { useMolecules } from '../../common';
import { StyleSheet } from 'react-native';
import { createContext } from 'react';
import { createContextBridge } from '../../../src/core/ContextBridge';

const Context = createContext('no content');

export type Props = {};

const ContextBridge = createContextBridge([Context]);

export const Example = (props: Props) => {
    const { View, Text } = useMolecules();

    return (
        <Context.Provider value="hello">
            <View style={styles.container}>
                <Context.Consumer>
                    {value => <Text>This child is placed in the parent div. Context: {value}</Text>}
                </Context.Consumer>

                <ContextBridge render={children => <Portal {...props}>{children}</Portal>}>
                    <Context.Consumer>
                        {value => (
                            <Text>
                                This child is rendered outside of the root parent Context: {value}
                            </Text>
                        )}
                    </Context.Consumer>
                </ContextBridge>
            </View>
        </Context.Provider>
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
