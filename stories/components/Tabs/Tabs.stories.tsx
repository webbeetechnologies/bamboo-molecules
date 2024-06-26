import type { ComponentMeta, ComponentStory } from '@storybook/react';

import { Example, ExampleControlled } from './Tabs';

export default {
    title: 'components/Tabs',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    style: {
        width: 360,
    },
    variant: 'primary',
    defaultValue: 'explore',
};

Default.parameters = {
    docs: {
        source: {
            code: `
export const Example = () => {
    return (
        <Tabs defaultValue="explore">
            <Tabs.Item
                name="flight"
                label="Flightsasfaf"
                iconName="airplanemode-on"
                iconType="material"
            />
            <Tabs.Item name="trips" accessibilityLabel="Trips">
                <Tabs.Label label="Trips" iconName="bag-checked" />
            </Tabs.Item>
            <Tabs.Item name="explore" accessibilityLabel="Explore">
                <Tabs.Label label="Explore" iconName="compass-outline" />
            </Tabs.Item>
        </Tabs>
    );
};

`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const Controlled: ComponentStory<typeof Example> = args => <ExampleControlled {...args} />;

Controlled.args = {
    style: {
        width: 360,
    },
    variant: 'primary',
};

Controlled.parameters = {
    docs: {
        source: {
            code: `
export const Controlled = () => {
    const [value, setValue] = useState('trips');

    return (
        <Tabs value={value} onChange={setValue}>
            <Tabs.Item
                name="flight"
                label="Flightsasfaf"
                iconName="airplanemode-on"
                iconType="material"
            >
                <Tabs.Label label="Flightsasfaf" iconName="airplanemode-on" />
            </Tabs.Item>
            <Tabs.Item name="trips" label="Trips" iconName="bag-checked">
                <Tabs.Label label="Trips" iconName="bag-checked" />
            </Tabs.Item>
            <Tabs.Item name="explore" label="Explore" iconName="compass-outline">
                <Tabs.Label label="Explore" iconName="compass-outline" />
            </Tabs.Item>
        </Tabs>
    );
};

`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
