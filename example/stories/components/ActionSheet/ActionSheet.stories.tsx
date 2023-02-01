import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import { Example, ExampleWithTrigger } from './ActionSheet';
import { Example as ListItem, ListItemTitle } from '../ListItem/ListItem';
import { Example as Icon } from '../Icon/Icon';
import { delay } from '../../common';

export default {
    title: 'components/ActionSheet',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    isOpen: true,
    gestureEnabled: true,
    snapPoints: [50, 80, 100],
    children: (
        <>
            <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                <ListItemTitle>First Item</ListItemTitle>
            </ListItem>
            <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                <ListItemTitle>Second Item</ListItemTitle>
            </ListItem>
            <ListItem right={<Icon name="account" size={26} />} onPress={() => {}}>
                <ListItemTitle>Third Item</ListItemTitle>
            </ListItem>
        </>
    ),
    onChange: () => {}, // to disabled storybook actions mock
    onOpen: () => {},
    onClose: () => {},
};

Default.parameters = {
    docs: {
        source: {
            code: `
    const { ActionSheet } = useMolecules();
    const { state: isOpen, setState: setIsOpen } = useToggle(false);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
    
    const onPressListItem = useCallback(() => {
        // . . .
    }, [])

    return (
        <ActionSheet isOpen={isOpen} onOpen={onOpen} onClose={onClose} gestureEnabled snapPoints={[50, 80, 100}>
          <>
                <ListItem right={<Icon name="account" size={26} />} onPress={onPressListItem}>
                    <ListItemTitle>First Item</ListItemTitle>
                </ListItem>
                <ListItem right={<Icon name="account" size={26} />} onPress={onPressListItem}>
                    <ListItemTitle>Second Item</ListItemTitle>
                </ListItem>
                <ListItem right={<Icon name="account" size={26} />} onPress={onPressListItem}>
                    <ListItemTitle>Third Item</ListItemTitle>
                </ListItem>
            </>
        </ActionSheet>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const UsageWithTrigger: ComponentStory<typeof Example> = args => (
    <ExampleWithTrigger {...args} />
);

UsageWithTrigger.args = {
    ...Default.args,
    closable: true,
};

UsageWithTrigger.parameters = {
    controls: {
        exclude: ['isOpen'],
    },
    docs: {
        source: {
            code: `
    const { ActionSheet, Button } = useMolecules();
    const { state: isOpen, setState: setIsOpen, onToggle } = useToggle(false);

    const onOpen = useCallback(() => {
        setIsOpen(true);
    }, [setIsOpen]);

    const onClose = useCallback(() => {
        setIsOpen(false);
    }, [setIsOpen]);
    
    const onPressListItem = useCallback(() => {
        // . . .
    }, []);

    return (
        <>
            <Button onPress={onOpen}>Show Action Sheet</Button>
            <ActionSheet gestureEnabled={true} snapPoints={[50, 80, 100]} ref={actionSheetRef}>
                <>
                    <ListItem right={<Icon name="account" size={26} />} onPress={onPressListItem}>
                        <ListItemTitle>First Item</ListItemTitle>
                    </ListItem>
                    <ListItem right={<Icon name="account" size={26} />} onPress={onPressListItem}>
                        <ListItemTitle>Second Item</ListItemTitle>
                    </ListItem>
                    <ListItem right={<Icon name="account" size={26} />} onPress={onPressListItem}>
                        <ListItemTitle>Third Item</ListItemTitle>
                    </ListItem>
                </>
            </ActionSheet>
        </>
    );
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Interactions = UsageWithTrigger.bind({});

Interactions.args = {
    ...UsageWithTrigger.args,
    testID: 'actionSheetInteractions',
};

Interactions.parameters = {
    ...UsageWithTrigger.parameters,
};

Interactions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement.ownerDocument.body);

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByTestId('actionSheetInteractions-trigger'));

    await delay(500);

    await waitFor(() => {
        expect(canvas.getByText('First Item')).toBeInTheDocument();
        expect(canvas.getByText('Second Item')).toBeInTheDocument();
        expect(canvas.getByText('Third Item')).toBeInTheDocument();
    });

    await delay(500);

    await userEvent.click(canvas.getByTestId('actionSheetInteractions-trigger'));

    await delay(500);

    await expect(canvas.queryByText('First Item')).not.toBeTruthy();
};
