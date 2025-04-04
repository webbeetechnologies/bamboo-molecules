import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { within, userEvent, waitFor } from '@storybook/test';
import { expect } from '@storybook/test';

import { delay } from '../../common';
import { Example, PopoverContent } from './Popover';

export default {
    title: 'components/Popover',
    component: Example,
} as ComponentMeta<typeof Example>;

const Template: ComponentStory<typeof Example> = args => {
    return <Example {...args} />;
};

export const Default = Template.bind({});
Default.args = {
    showArrow: true,
    placement: 'top',
    shouldFlip: true,
    offset: 0,
    crossOffset: 0,
    children: <PopoverContent />,
};

Default.parameters = {
    controls: {
        exclude: /(?:\b|')(isOpen|setIsOpen|defaultIsOpen)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
export const Example = () => {
    const { View } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle } = useToggle(false);

    return (
        <>
            <View style={styles.container}>
                <Button ref={triggerRef} onPress={onToggle} testID={'trigger'}>
                    Show Popover
                </Button>
                <Popover triggerRef={triggerRef} isOpen={isOpen} onClose={onToggle} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 'spacings.24',
    },
});
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const PopoverControlled: ComponentStory<typeof Example> = args => {
    return <Example {...args} />;
};
PopoverControlled.args = {
    showArrow: true,
    placement: 'top',
    isOpen: true,
    shouldFlip: true,
    offset: 0,
    crossOffset: 0,
    children: <PopoverContent />,
};

PopoverControlled.parameters = {
    docs: {
        source: {
            code: `
export const Example = () => {
    const { View } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle } = useToggle(false);

    return (
        <>
            <View style={styles.container}>
                <Button ref={triggerRef} onPress={onToggle} testID={'trigger'}>
                    Show Popover
                </Button>
                <Popover triggerRef={triggerRef} isOpen={isOpen} onClose={onToggle} />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 'spacings.24',
    },
});
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const OpenPopover = Template.bind({});
OpenPopover.args = { ...Default.args };
OpenPopover.parameters = { ...Default.parameters };
OpenPopover.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // See https://storybook.js.org/docs/react/essentials/actions#automatically-matching-args to learn how to setup logging in the Actions panel
    await userEvent.click(canvas.getByTestId('trigger'));

    await delay(500);

    // 👇 Assert DOM structure
    await waitFor(() => {
        expect(canvas.getByText("I'm a popover")).toBeInTheDocument();
    });
};
