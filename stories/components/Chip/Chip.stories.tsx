import type { ComponentMeta, ComponentStory } from '@storybook/react';
import { userEvent, waitFor, within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

import {
    Example,
    AssistChipExample,
    InputChipExample,
    FilterChipExample,
    SuggestionChipExample,
} from './Chip';
import { Icon } from '../../../src/components';
import { delay } from '../../common';

export default {
    title: 'components/Chip',
    component: Example,
} as ComponentMeta<typeof Example>;

export const Default: ComponentStory<typeof Example> = args => <Example {...args} />;

Default.args = {
    label: 'Default Chip',
    variant: 'outlined',
    size: 'md',
    left: <Icon name="star-outline" size={18} />,
    onClose: () => {},
    onPress: () => {},
};

Default.parameters = {
    docs: {
        source: {
            code: `
<Chip label="Default Chip" variant="outlined" size="md" left={<Icon name="star-outline" size={18} />} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const SuggestionChip: ComponentStory<typeof SuggestionChipExample> = args => (
    <SuggestionChipExample {...args} />
);

SuggestionChip.args = {
    label: 'Suggestion Chip',
    variant: 'outlined',
    size: 'md',
};

SuggestionChip.parameters = {
    controls: {
        exclude: [
            'onClose',
            'closeIconName',
            'closeIconType',
            'selected',
            'selectedColor',
            'selectionBackgroundColor',
            'left',
            'right',
            'leftElementContainerStyle',
            'rightElementContainerStyle',
        ],
    },
    docs: {
        source: {
            code: `
<Chip.Suggestion label="Suggestion Chip" variant="outlined" size="md" />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const AssistChip: ComponentStory<typeof AssistChipExample> = args => (
    <AssistChipExample {...args} />
);

AssistChip.args = {
    label: 'Assist Chip',
    variant: 'outlined',
    size: 'md',
    left: <Icon name="calendar" size={18} />,
};

AssistChip.parameters = {
    controls: {
        exclude: [
            'onClose',
            'closeIconName',
            'closeIconType',
            'selected',
            'selectedColor',
            'selectionBackgroundColor',
        ],
    },
    docs: {
        source: {
            code: `
<Chip.Assist label="Assist Chip" variant="outlined" size="md" left={<Icon name="calendar" size={18} />} />
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const InputChip: ComponentStory<typeof InputChipExample> = args => (
    <InputChipExample {...args} />
);

InputChip.args = {
    label: 'Input Chip',
    variant: 'outlined',
    size: 'md',
};

InputChip.parameters = {
    docs: {
        source: {
            code: `
const { Chip } = useMolecules();
const { state: selected, onToggle, setState: setSelected } = useToggle(props.selected);

useEffect(() => setSelected(!!props.selected), [props.selected, setSelected]);

return <Chip.Input selected={selected} onPress={onToggle} />;
`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const FilterChip: ComponentStory<typeof FilterChipExample> = args => (
    <FilterChipExample {...args} />
);

FilterChip.args = {
    label: 'Filter Chip',
    variant: 'outlined',
    size: 'md',
};

FilterChip.parameters = {
    controls: {
        exclude: ['onClose', 'closeIconName', 'closeIconType'],
    },
    docs: {
        source: {
            code: `
const { Chip } = useMolecules();
const { state: selected, onToggle, setState: setSelected } = useToggle(props.selected);

useEffect(() => setSelected(!!props.selected), [props.selected, setSelected]);

return <Chip.Filter selected={selected} onPress={onToggle} />;`,
            language: 'tsx',
            type: 'auto',
        },
    },
};

export const ChipInteractions = InputChip.bind({});

ChipInteractions.args = {
    ...InputChip.args,
    onPress: () => {},
    testID: 'input-chip',
};

ChipInteractions.parameters = {
    ...InputChip.parameters,
};

ChipInteractions.play = async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
        expect(canvas.getByTestId('input-chip')).toBeInTheDocument();
    });

    await delay(500);

    await userEvent.click(canvas.getByTestId('input-chip'));

    await delay(500);

    // character for checkmark
    await expect(canvas.getByText('󰄬'));

    await delay(1000);

    await userEvent.click(canvas.getByTestId('input-chip'));

    await delay(500);
    // character for checkmark
    await expect(canvas.queryByText('󰄬')).not.toBeTruthy();
};
