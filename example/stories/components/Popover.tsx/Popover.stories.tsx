import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Example, PopoverContent } from './Popover';

import { within, userEvent } from '@storybook/testing-library';
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
    trigger: props => (
        <Button testID="trigger" {...props}>
            Show popover
        </Button>
    ),
    children: <PopoverContent />,
};

Default.parameters = {
    controls: {
        exclude: /(?:\b|')(isOpen|setIsOpen|defaultIsOpen)(?:\b|')/,
    },
    docs: {
        source: {
            code: `
const {Button, H4, Popover, Text, View} = useMolecules();
return (
    <Popover
        showArrow
        trigger={(props) => <Button { ...props }>Show popover</Button>}
        placement="top"
        shouldFlip={true}
        offset={4}
        closeOnScroll={true}>
        <View>
            <H4>I'm a popover</H4>
            <Text>I'm the text inside a popover</Text>
        </View>
    </Popover>
)
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
    trigger: props => (
        <Button testID="trigger" {...props}>
            Show popover
        </Button>
    ),
    children: <PopoverContent />,
};

PopoverControlled.parameters = {
    docs: {
        source: {
            code: `
const {Button, H4, Popover, Text, View} = useMolecules();
const [isOpen, setIsOpen] = useState(false);

return (
    <Popover
        showArrow
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        trigger={(props) => <Button { ...props }>Show popover</Button>}
        placement="top"
        shouldFlip={true}
        offset={4}
        closeOnScroll={true}>
        <View>
            <H4>I'm a popover</H4>
            <Text>I'm the text inside a popover</Text>
        </View>
    </Popover>
)
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
    await expect(canvas.getByText("I'm a popover")).toBeInTheDocument();
};
