import { memo, useMemo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useCellFocusMethods, useDragAndExtendMethods } from '../../plugins';

const useBoolean = () => false;
const emptyObj = {};

// TODO - inject this to Provider
const RowWrapper = ({ style, index, ...rest }: ViewProps & { index: number }) => {
    const { View } = useMolecules();

    const { useIsRowFocused } = useCellFocusMethods();
    const { useIsDragHandleVisibleRow = useBoolean } = useDragAndExtendMethods() || emptyObj;

    const isRowFocused = useIsRowFocused(index);
    const isDragHandleVisibleOnRow = useIsDragHandleVisibleRow({ rowIndex: index });

    const rowRendererStyle = useMemo(
        () => [style, (isRowFocused || isDragHandleVisibleOnRow) && { zIndex: 9 }],
        [isDragHandleVisibleOnRow, isRowFocused, style],
    );

    return <View style={rowRendererStyle} {...rest} />;
};

export default memo(RowWrapper);
