'use client';

import { ActivityIndicator } from '@bambooapp/bamboo-molecules/components/ActivityIndicator';
import { Button } from '@bambooapp/bamboo-molecules/components/Button';
import { Checkbox } from '@bambooapp/bamboo-molecules/components/Checkbox';
import { TextInput } from '@bambooapp/bamboo-molecules/components/TextInput';
import { TimePicker } from '@bambooapp/bamboo-molecules/components/TimePicker';
import { TimePickerField } from '@bambooapp/bamboo-molecules/components/TimePickerField';

import {
    Example as AccordionExample,
    ExampleControlled as AccordionControlledExample,
    ExampleNestedAccordion as AccordionNestedExample,
} from '@bambooapp-workspace/examples-common/components/Accordion';
import {
    CardWithMedia,
    CardsInCollection,
    ComposedCardExample,
    BasicCard,
} from '@bambooapp-workspace/examples-common/components/Card';
import {
    Example as AppbarExample,
    ExampleCenterAligned as AppbarExampleCenterAligned,
    ExampleLarge as AppbarExampleLarge,
    ExampleMedium as AppbarExampleMedium,
    ExampleSmall as AppbarExampleSmall,
} from '@bambooapp-workspace/examples-common/components/Appbar';

export default () => {
    return (
        <>
            <ActivityIndicator />
            <Checkbox />
            <Button variant="contained" onPress={() => {}}>
                Hello
            </Button>
            <TextInput label="Input" variant="outlined" />
            <AccordionNestedExample />
            <BasicCard />
            <AppbarExample />
            <TimePicker />
            <TimePickerField />
        </>
    );
};
