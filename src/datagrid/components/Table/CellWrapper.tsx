import { memo, useMemo } from 'react';
import { DataCellProps, useDataTableCell } from '@bambooapp/bamboo-molecules/components';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useCellFocusMethods, useDragAndExtendMethods } from '../../plugins';

const emptyObj = {};
const useBoolean = () => false;

// TODO - inject this to Provider
const CellWrapperComponent = ({ style, ...rest }: DataCellProps) => {
    const { View } = useMolecules();
    const { row, column, rowIndex, columnIndex } = useDataTableCell();
    const { useIsDragHandleVisible = useBoolean } = useDragAndExtendMethods() || emptyObj;
    const { useIsCellFocused } = useCellFocusMethods();

    const { isFocused } = useIsCellFocused(row, column)!;
    const isVisible = useIsDragHandleVisible({ columnIndex, rowIndex, isFocused });

    const cellRendererStyle = useMemo(
        () => [style, (isFocused || isVisible) && { zIndex: 100 }],
        [isFocused, isVisible, style],
    );

    return <View style={cellRendererStyle} {...rest} />;
};
CellWrapperComponent.displayName = 'DataGridCellWrapperComponent';

export default memo(CellWrapperComponent);
