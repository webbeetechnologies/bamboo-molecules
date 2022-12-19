import type { ComponentMeta, ComponentStory } from '@storybook/react';

import {
    Example,
    AssistChipExample,
    InputChipExample,
    FilterChipExample,
    SuggestionChipExample,
} from './Chip';
import { Example as Icon } from '../Icon/Icon';

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
