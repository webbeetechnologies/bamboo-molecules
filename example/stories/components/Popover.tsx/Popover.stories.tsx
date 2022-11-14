import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Button, Example } from './Popover';
import { ProvideMolecules } from 'bamboo-molecules';
import { Text, View } from 'react-native';

export default {
    title: 'components/Popover',
    component: Example,
    decorators: [
        Story => (
            <ProvideMolecules>
                <Story />
            </ProvideMolecules>
        ),
    ],
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    showArrow: true,
    placement: 'top',
    shouldFlip: true,
    offset: 0,
    crossOffset: 0,
    trigger: props => {
        console.log('Trigger Button:', { props });
        return <Button {...props}>Show popover</Button>;
    },
    children: (
        <View>
            <Text style={{ fontSize: 16 }}>I'm a popover</Text>
            <Text>I'm the text inside a popover</Text>
        </View>
    ),
};

Default.parameters = {
    docs: {
        source: {
            code: `
const {Button, H4, Popover, Text, View} = useMolecules();
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
            `,
            language: 'tsx',
            type: 'auto',
        },
    },
};
