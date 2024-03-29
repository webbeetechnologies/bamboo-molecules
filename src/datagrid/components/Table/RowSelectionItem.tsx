import { memo, useCallback } from 'react';
import { useMolecules } from '../../../hooks';
import { CallbackActionState, withActionState } from '../../../hocs';

export type RowSelectionItemProps = {
    index: number;
    isSelected: boolean;
    onRowSelect: () => void;
};

const _RowSelectionItem = ({
    hovered,
    index,
    isSelected,
    onRowSelect,
}: RowSelectionItemProps & CallbackActionState) => {
    const { Checkbox, Text } = useMolecules();

    const onChange = useCallback(() => {
        onRowSelect();
    }, [onRowSelect]);

    if (hovered || isSelected) return <Checkbox size="sm" value={isSelected} onChange={onChange} />;

    return <Text>{index + 1}</Text>;
};

export default memo(withActionState(_RowSelectionItem));
