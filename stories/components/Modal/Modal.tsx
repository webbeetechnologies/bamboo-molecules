import { StyleSheet } from 'react-native';
import { Modal, ModalProps } from '../../../src/components';
import { useMolecules } from '../../common';

export type Props = Omit<ModalProps, 'children'> & {};

export const Example = (props: Props) => {
    const { View, Text, Portal } = useMolecules();

    return (
        <Portal>
            <Modal {...props}>
                <View style={styles.container}>
                    <Text>Modal Content</Text>
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
