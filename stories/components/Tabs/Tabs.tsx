import { Tabs, TabsProps } from '../../../src/components';
import { useState } from 'react';

export type Props = TabsProps & {};

export const Example = (props: Props) => {
    return (
        <Tabs {...props}>
            <Tabs.Item
                name="flight"
                label="Flightsasfaf"
                iconName="airplanemode-on"
                iconType="material"
            />
            <Tabs.Item name="trips" label="Trips" iconName="bag-checked" />
            <Tabs.Item name="explore" label="Explore" iconName="compass-outline" />
        </Tabs>
    );
};

export const ExampleControlled = (props: Props) => {
    const [value, setValue] = useState('trips');

    return (
        <Tabs {...props} value={value} onChange={setValue}>
            <Tabs.Item
                name="flight"
                label="Flightsasfaf"
                iconName="airplanemode-on"
                iconType="material"
            />
            <Tabs.Item name="trips" label="Trips" iconName="bag-checked" />
            <Tabs.Item name="explore" label="Explore" iconName="compass-outline" />
        </Tabs>
    );
};
