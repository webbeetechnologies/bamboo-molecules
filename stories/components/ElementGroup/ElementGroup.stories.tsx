import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { Example as Button } from '../Button/Button';
import { Example as TextInput } from '../TextInput/TextInput';
import { Example as Icon } from '../Icon/Icon';

import { Example, ExampleNestedElementGroup } from './ElementGroup';

export default {
    title: 'components/ElementGroup',
    component: Example,
} as ComponentMeta<typeof Example>;

export const ButtonGroup: ComponentStory<typeof Example> = args => <Example {...args} />;

ButtonGroup.args = {
    orientation: 'horizontal',
    children: [
        <Button variant="contained" onPress={() => {}}>
            Button
        </Button>,
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>,
    ],
};

ButtonGroup.parameters = {
    docs: {
        source: {
            code: `
<ElementGroup>
        <Button variant="contained" onPress={() => {}}>
            Button
        </Button>
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>
</ElementGroup>
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

// TODO revisit button height issue
export const TextInputElementGroup: ComponentStory<typeof Example> = args => <Example {...args} />;

TextInputElementGroup.args = {
    children: [
        <TextInput variant="outlined" />,
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>,
    ],
};

TextInputElementGroup.parameters = {
    docs: {
        source: {
            code: `
<ElementGroup>
        <TextInput variant="outlined" />
        <Button variant="contained" onPress={() => {}}>
            <Icon name="chevron-down" size={26} />
        </Button>
</ElementGroup>`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const NestedElementGroup: ComponentStory<typeof ExampleNestedElementGroup> = args => (
    <ExampleNestedElementGroup {...args} />
);

NestedElementGroup.args = {};

NestedElementGroup.parameters = {
    docs: {
        source: {
            code: `
import {
    ElementGroup,
    Select,
    TextInput,
    IconButton,
    TextInputProps,
} from '../../../src/components';
import { StyleSheet } from 'react-native';
import { useCallback, useMemo } from 'react';

export const ExampleNestedElementGroup = () => {
    const onPressDelete = useCallback(() => {}, []);
    const onPressDrag = useCallback(() => {}, []);

    const inputProps = useMemo(
        () => ({ variant: 'outlined', label: 'Select operator' } as TextInputProps),
        [],
    );

    return (
        <ElementGroup>
            <ElementGroup>
                <Select records={records} inputProps={inputProps} />
                <TextInput variant="outlined" label="value" />
            </ElementGroup>
            <IconButton
                name="delete"
                variant="outlined"
                onPress={onPressDelete}
                style={styles.iconButton}
            />
            <IconButton
                name="drag"
                variant="outlined"
                onPress={onPressDrag}
                style={styles.iconButton}
            />
        </ElementGroup>
    );
};

const records = [
    {
        data: [
            {
                id: 1,
                label: 'contains',
            },
            {
                id: 2,
                label: 'does not contain',
            },
            {
                id: 3,
                label: 'is',
            },
            {
                id: 4,
                label: 'is not',
            },
            {
                id: 5,
                label: 'is empty',
            },
            {
                id: 6,
                label: 'is not empty',
            },
        ],
    },
];

const styles = StyleSheet.create({
    iconButton: { height: '100%', width: 45 },
});`,
            language: 'tsx',
            type: 'auto',
        },
    },
};
