import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { delay } from '../../common';
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

    const iconProps = useMemo(() => ({ name: 'cellphone-check' }), []);

// We need to use the Portal if we want the modal to render outside the component tree
    return (
        <Dialog iconProps={iconProps}>
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
    
    const iconProps = useMemo(() => ({ name: 'cellphone-check' }), []);

    return (
        <>
            <Button onPress={onOpen}>Show Dialog</Button>
            <Dialog iconProps={iconProps} isOpen={isOpen} onClose={onClose} >
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
        </>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

UsageWithTrigger.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body); // because the dialog goes outside of the component

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByTestId('dialog-trigger'));

    await delay(500);

    // 👇 Assert DOM structure
    await expect(canvas.getByText('Dialog with Hero Icon')).toBeInTheDocument();
};
