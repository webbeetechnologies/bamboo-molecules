import { StyleSheet } from 'react-native';
import { Modal, ModalProps } from '../../../src/components';
import { useMolecules } from '../../common';
import { Default as SelectExample } from '../Select/Select.stories';
import { Default as PopoverExample } from '../Popover/Popover.stories';

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

export const ExampleWithSelectAndModal = (props: Props) => {
    const { View, Portal } = useMolecules();

    return (
        <Portal>
            <Modal {...props}>
                <View style={styles.container}>
                    {/* @ts-ignore */}
                    <SelectExample {...SelectExample.args} />
                    <PopoverExample {...PopoverExample.args} />
                </View>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 350,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'spacings.6',
    },
});
