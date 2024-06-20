import { Tabs, TabsProps } from '../../../src/components';
import { useState } from 'react';

export type Props = TabsProps & {};

export const Example = (props: Props) => {
    return (
        <Tabs {...props}>
            <Tabs.Item name="flight">
                <Tabs.Label label="Flightsasfaf" iconName="airplanemode-on" iconType="material" />
            </Tabs.Item>
            <Tabs.Item name="trips">
                <Tabs.Label label="Trips" iconName="bag-checked" />
            </Tabs.Item>
            <Tabs.Item name="explore">
                <Tabs.Label label="Explore" iconName="compass-outline" />
            </Tabs.Item>
        </Tabs>
    );
};

export const ExampleControlled = (props: Props) => {
    const [value, setValue] = useState('trips');

    return (
        <Tabs {...props} value={value} onChange={setValue}>
            <Tabs.Item name="flight">
                <Tabs.Label label="Flightsasfaf" iconName="airplanemode-on" iconType="material" />
            </Tabs.Item>
            <Tabs.Item name="trips">
                <Tabs.Label label="Trips" iconName="bag-checked" />
            </Tabs.Item>
            <Tabs.Item name="explore">
                <Tabs.Label label="Explore" iconName="compass-outline" />
            </Tabs.Item>
        </Tabs>
    );
};
