import { Chip, ChipProps } from '../../../src/components';
import { useToggle } from '../../../src';
import { useEffect } from 'react';

export const Example = (props: ChipProps) => {
    return <Chip {...props} />;
};

export const AssistChipExample = (props: ChipProps) => {
    return <Chip.Assist {...props} />;
};

export const SuggestionChipExample = (props: ChipProps) => {
    return <Chip.Suggestion {...props} />;
};

export const FilterChipExample = (props: ChipProps) => {
    const { state: selected, onToggle, setState: setSelected } = useToggle(props.selected);

    useEffect(() => setSelected(!!props.selected), [props.selected, setSelected]);

    return <Chip.Filter {...props} selected={selected} onPress={onToggle} />;
};

export const InputChipExample = (props: ChipProps) => {
    const { state: selected, onToggle, setState: setSelected } = useToggle(props.selected);

    useEffect(() => setSelected(!!props.selected), [props.selected, setSelected]);

    return <Chip.Input {...props} selected={selected} onPress={onToggle} />;
};
