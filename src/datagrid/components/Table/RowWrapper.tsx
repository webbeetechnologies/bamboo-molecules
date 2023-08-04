import { memo, useMemo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useTableManagerValueSelector } from '../../contexts';

// TODO - inject this to Provider
const RowWrapper = ({ style, index, ...rest }: ViewProps & { index: number }) => {
    const { View } = useMolecules();

    const isRowFocused = useTableManagerValueSelector(
        store => store.focusedCell?.rowIndex === index,
    )!;

    const rowRendererStyle = useMemo(
        () => [style, isRowFocused && { zIndex: 100 }],
        [isRowFocused, style],
    );

    return <View style={rowRendererStyle} {...rest} />;
};

export default memo(RowWrapper);
