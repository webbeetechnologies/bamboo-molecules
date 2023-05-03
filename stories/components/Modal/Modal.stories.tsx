import { useCallback } from 'react';
import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { useArgs } from '@storybook/addons';

import { Button } from '../../../src/components/Button';

import { Example, ExampleWithSelectAndModal } from './Modal';

export default {
    title: 'components/Modal',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => {
    const [_, updateArgs] = useArgs();

    const onOpen = useCallback(() => {
        updateArgs({ ...args, isOpen: true });
    }, [args, updateArgs]);

    const onClose = useCallback(() => {
        updateArgs({ ...args, isOpen: false });
    }, [args, updateArgs]);

    return (
        <>
            <Button onPress={onOpen}>Show Modal</Button>
            <Example {...args} onClose={onClose} />
        </>
    );
};

Default.args = {
    isOpen: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
import { useMolecules, useToggle } from '@bambooapp/bamboo-molecules';
            
            
// We need to use the Portal if we want the modal to render outside the component tree            
export const Example = () => {
    const { Button, View, Text, Portal } = useMolecules();
    const { state: isOpen, handleClose, handleOpen } = useToggle(false);

    return (
        <>
            <Button onPress={onOpen}>Show Modal</Button>
            <Portal>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <View style={styles.container}>
                        <Text>Modal Content</Text>
                    </View>
                </Modal>
            </Portal>
        </>
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
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const WithSelectAndPopover: ComponentStory<typeof ExampleWithSelectAndModal> = args => {
    const [_, updateArgs] = useArgs();

    const onOpen = useCallback(() => {
        updateArgs({ ...args, isOpen: true });
    }, [args, updateArgs]);

    const onClose = useCallback(() => {
        updateArgs({ ...args, isOpen: false });
    }, [args, updateArgs]);

    return (
        <>
            <Button onPress={onOpen}>Show Modal</Button>
            <ExampleWithSelectAndModal {...args} onClose={onClose} />
        </>
    );
};

WithSelectAndPopover.args = {
    isOpen: true,
};

WithSelectAndPopover.parameters = {
    docs: {
        source: {
            code: `
            import { useMolecules, useToggle } from '@bambooapp/bamboo-molecules';
            
export const Example = () => {
    const { Button, View, Text, Portal } = useMolecules();
    const { state: isOpen, handleClose, handleOpen } = useToggle(false);

    return (
        <>
            <Button onPress={onOpen}>Show Modal</Button>
            <Portal>
                <Modal isOpen={isOpen} onClose={onClose}>
                    <View style={styles.container}>
                        <Text>Modal Content</Text>
                    </View>
                </Modal>
            </Portal>
        </>
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
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
