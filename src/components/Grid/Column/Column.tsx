import { FC, memo, PropsWithChildren, useMemo } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import { useMolecules } from '../../../hooks';
import { generateColStyles } from './utils';

export type Props = ViewProps & {
    /**
     * Number of columns for the grid
     */
    numberOfColumns: number;
    /**
     * Reference breakpoints for the grid
     */
    referenceBreakpoints: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
    };
    /**
     * Number of columns to span
     * @default 1
     */
    breakPoints?:
        | number
        | {
              xs?: number;
              sm?: number;
              md?: number;
              lg?: number;
              xl?: number;
          };
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
    breakPoints,
    children,
    alignment,
    referenceBreakpoints,
    style,
}) => {
    const { View } = useMolecules();
    const { width } = useWindowDimensions();
    const colSize = useMemo(() => {
        if (breakPoints === undefined) return 1;
        if (typeof breakPoints === 'number') {
            return breakPoints;
        } else {
            if (breakPoints.xl && width > referenceBreakpoints.lg) {
                return breakPoints.xl;
            }
            if (breakPoints.lg && width > referenceBreakpoints.md) {
                return breakPoints.lg;
            }
            if (breakPoints.md && width > referenceBreakpoints.sm) {
                return breakPoints.md;
            }
            if (breakPoints.sm && width > referenceBreakpoints.xs) {
                return breakPoints.sm;
            }
            if (breakPoints.xs) {
                return breakPoints.xs;
            }
            return numberOfColumns;
        }
    }, [width, breakPoints]);

    const colStyles = useMemo(() => generateColStyles(numberOfColumns), [numberOfColumns]);
    const styles = useMemo(
        () => [
            colStyles[`col-${colSize}`],
            {
                // set alignment
                alignItems: alignment,
                // calculate width based on colSize
                flexBasis: `${(colSize / numberOfColumns) * 100}%`,
                minWidth: (colSize / numberOfColumns) * width,
                maxWidth: (colSize / numberOfColumns) * width,
            },
        ],
        [colSize, alignment, width, colStyles, numberOfColumns],
    );
    return <View style={[styles, style]}>{children}</View>;
};

export default memo(Column);
