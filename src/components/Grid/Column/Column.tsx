import { FC, memo, PropsWithChildren, useMemo } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import { useMolecules } from '../../../hooks';
import type { Breakpoints } from '../types';
import { generateColStyles } from './utils';

export type Props = ViewProps & {
    /**
     * Number of columns for the grid
     */
    numberOfColumns: number;
    /**
     * Reference breakpoints for the grid
     */
    referenceBreakpoints: Partial<Breakpoints>;
    /**
     * Number of columns to span
     * @default 1
     */
    breakpoints?: number | Partial<Breakpoints>;
    /**
     * Name of module or field to render
     */
    name: string;
    /**
     * Alignment of the column
     */
    alignment?: 'top' | 'center' | 'bottom';
};

const Column: FC<PropsWithChildren<Props>> = ({
    numberOfColumns,
    breakpoints,
    children,
    alignment,
    referenceBreakpoints,
    style,
}) => {
    const { View } = useMolecules();
    const { width } = useWindowDimensions();
    const colSize = useMemo(() => {
        if (!breakpoints) return 1;
        if (typeof breakpoints === 'number') {
            return breakpoints;
        } else {
            if (referenceBreakpoints.lg && breakpoints.xl && width > referenceBreakpoints.lg) {
                return breakpoints.xl;
            }
            if (referenceBreakpoints.md && breakpoints.lg && width > referenceBreakpoints.md) {
                return breakpoints.lg;
            }
            if (referenceBreakpoints.sm && breakpoints.md && width > referenceBreakpoints.sm) {
                return breakpoints.md;
            }
            if (referenceBreakpoints.xs && breakpoints.sm && width > referenceBreakpoints.xs) {
                return breakpoints.sm;
            }
            if (breakpoints.xs) {
                return breakpoints.xs;
            }
            return numberOfColumns;
        }
    }, [
        breakpoints,
        referenceBreakpoints.lg,
        referenceBreakpoints.md,
        referenceBreakpoints.sm,
        referenceBreakpoints.xs,
        width,
        numberOfColumns,
    ]);

    const colStyles = useMemo(() => generateColStyles(numberOfColumns), [numberOfColumns]);
    const styles = useMemo(
        () => [
            colStyles[`col-${colSize}`],
            {
                // set alignment
                alignItems: alignment,
                // calculate width based on colSize
                minWidth: `${(colSize / numberOfColumns) * 100}%`,
                maxWidth: `${(colSize / numberOfColumns) * 100}%`,
            },
        ],
        [colSize, alignment, colStyles, numberOfColumns],
    );

    return <View style={[styles, style]}>{children}</View>;
};

export default memo(Column);
