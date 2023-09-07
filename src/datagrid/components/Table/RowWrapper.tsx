import { memo, useMemo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useMolecules } from '@bambooapp/bamboo-molecules';
import { useCellFocusMethods } from '../../plugins';

// TODO - inject this to Provider
const RowWrapper = ({ style, index, ...rest }: ViewProps & { index: number }) => {
    const { View } = useMolecules();

    const { useIsRowFocused } = useCellFocusMethods();

    const isRowFocused = useIsRowFocused(index);

    const rowRendererStyle = useMemo(
        () => [style, isRowFocused && { zIndex: 9 }],
        [isRowFocused, style],
    );

    return <View style={rowRendererStyle} {...rest} />;
};

export default memo(RowWrapper);
