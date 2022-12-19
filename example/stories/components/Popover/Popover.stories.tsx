import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, PopoverContent } from './Popover';

import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

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
const { Popover, View, Button } = useMolecules();
const triggerRef = useRef(null);
const [isOpen, onToggle] = useToggle(false);

return (
    <>
        <Button ref={triggerRef} onPress={onToggle}>
            Show Popover
        </Button>
        <View style={{ padding: 100, backgroundColor: 'colors.surface' }}>
            <Popover {...props} triggerRef={triggerRef} isOpen={isOpen} onClose={onToggle} />
        </View>
    </>
);
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
const { Popover, View, Button } = useMolecules();
const triggerRef = useRef(null);
const [isOpen, onToggle] = useToggle(false);

return (
    <>
        <Button ref={triggerRef} onPress={onToggle}>
            Show Popover
        </Button>
        <View style={{ padding: 100, backgroundColor: 'colors.surface' }}>
            <Popover {...props} triggerRef={triggerRef} isOpen={isOpen} onClose={onToggle} />
        </View>
    </>
);
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

    await new Promise(resolve => setTimeout(resolve, 500));

    // 👇 Assert DOM structure
    await waitFor(() => {
        expect(canvas.getByText("I'm a popover")).toBeInTheDocument();
    });
};
