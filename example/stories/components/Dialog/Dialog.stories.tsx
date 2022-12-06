import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { ExampleWithContent, ExampleWithTrigger } from './Dialog';

export default {
    title: 'components/Dialog',
    component: ExampleWithContent,
} as ComponentMeta<typeof ExampleWithContent>;

export const Default: ComponentStory<typeof ExampleWithContent> = args => (
    <ExampleWithContent {...args} />
);

Default.args = {
    isOpen: true,
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { Dialog, Text, Button } = useMolecules();

    return (
        <Dialog {...props}>
            <Dialog.Icon name="cellphone-check" />
            <Dialog.Title>Dialog with Hero Icon</Dialog.Title>
            <Dialog.Content>
                <Text>
                    Dialog is a type of modal window that appears in front of app content to provide
                    critical information, or ask for a decision
                </Text>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={props.onClose}>Cancel</Button>
                <Button onPress={props.onClose}>Enabled</Button>
            </Dialog.Actions>
        </Dialog>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const UsageWithTrigger: ComponentStory<typeof ExampleWithTrigger> = args => (
    <ExampleWithTrigger {...args} />
);

UsageWithTrigger.args = {};

UsageWithTrigger.parameters = {
    docs: {
        source: {
            code: `
    const { Dialog, Text, Button } = useMolecules();
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    return (
        <>
            <Button onPress={onOpen}>Show Dialog</Button>
            <Dialog {...props} isOpen={isOpen} onClose={onClose}>
                <Dialog.Icon name="cellphone-check" />
                <Dialog.Title>Dialog with Hero Icon</Dialog.Title>
                <Dialog.Content>
                    <Text>
                        Dialog is a type of modal window that appears in front of app content to
                        provide critical information, or ask for a decision
                    </Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={onClose}>Cancel</Button>
                    <Button onPress={onClose}>Enabled</Button>
                </Dialog.Actions>
            </Dialog>
        </>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
