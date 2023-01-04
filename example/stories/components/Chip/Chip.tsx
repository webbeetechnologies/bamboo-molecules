import { useMolecules, ChipProps, useToggle } from 'bamboo-molecules';
import { useEffect } from 'react';

export const Example = (props: ChipProps) => {
    const { Chip } = useMolecules();

    return <Chip {...props} />;
};

export const AssistChipExample = (props: ChipProps) => {
    const { Chip } = useMolecules();

    return <Chip.Assist {...props} />;
};

export const SuggestionChipExample = (props: ChipProps) => {
    const { Chip } = useMolecules();

    return <Chip.Suggestion {...props} />;
};

export const FilterChipExample = (props: ChipProps) => {
    const { Chip } = useMolecules();
    const { state: selected, onToggle, setState: setSelected } = useToggle(props.selected);

    useEffect(() => setSelected(!!props.selected), [props.selected, setSelected]);

    return <Chip.Filter {...props} selected={selected} onPress={onToggle} />;
};

export const InputChipExample = (props: ChipProps) => {
    const { Chip } = useMolecules();
    const { state: selected, onToggle, setState: setSelected } = useToggle(props.selected);

    useEffect(() => setSelected(!!props.selected), [props.selected, setSelected]);

    return <Chip.Input {...props} selected={selected} onPress={onToggle} />;
};
