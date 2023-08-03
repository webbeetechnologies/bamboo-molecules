import { memo, useMemo } from 'react';
import { DataCellProps, useDataTableCell } from '@bambooapp/bamboo-molecules/components';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useIsCellFocused } from '../../contexts';
import { useDragAndExtendMethods } from '../../plugins';

const emptyObj = {};
const useBoolean = () => false;

// TODO - inject this to Provider
const CellWrapperComponent = ({ style, ...rest }: DataCellProps) => {
    const { View } = useMolecules();
    const { rowIndex, columnIndex } = useDataTableCell();
    const { useIsDragHandleVisible = useBoolean } = useDragAndExtendMethods() || emptyObj;

    const [isFocused] = useIsCellFocused(rowIndex, columnIndex)!;
    const isVisible = useIsDragHandleVisible({ columnIndex, rowIndex, isFocused });

    const cellRendererStyle = useMemo(
        () => [style, (isFocused || isVisible) && { zIndex: 100 }],
        [isFocused, isVisible, style],
    );

    return <View style={cellRendererStyle} {...rest} />;
};

export default memo(CellWrapperComponent);
