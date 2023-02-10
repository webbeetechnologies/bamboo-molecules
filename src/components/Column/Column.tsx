import { FC, memo, PropsWithChildren, useMemo } from 'react';
import { useWindowDimensions, ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';

const breakpoints = {
    xs: 320,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
};

export type Props = ViewProps & {
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
     * Theme id
     */
    theme?: string;
    /**
     * Name of module or field to render
     */
    name: string;
    /**
     * Alignment of the column
     */
    alignment?: 'top' | 'center' | 'bottom';
};

const Column: FC<PropsWithChildren<Props>> = ({ breakPoints, children, alignment, style }) => {
    const { View } = useMolecules();
    const { width } = useWindowDimensions();
    const colSize = useMemo(() => {
        if (breakPoints === undefined) return 1;
        if (typeof breakPoints === 'number') {
            return breakPoints;
        } else {
            if (breakPoints.xl && width > breakpoints.lg) {
                return breakPoints.xl;
            }
            if (breakPoints.lg && width > breakpoints.md) {
                return breakPoints.lg;
            }
            if (breakPoints.md && width > breakpoints.sm) {
                return breakPoints.md;
            }
            if (breakPoints.sm && width > breakpoints.xs) {
                return breakPoints.sm;
            }
            if (breakPoints.xs) {
                return breakPoints.xs;
            }
            return 12;
        }
    }, [width, breakPoints]);

    const componentStyles = useComponentStyles('Column', style);
    const styles = useMemo(
        () => [
            componentStyles[`col-${colSize}`],
            {
                // set alignment
                alignItems: alignment,
                // calculate width based on colSize
                flexBasis: `${(colSize / 12) * 100}%`, // issue here
                minWidth: (colSize / 12) * width,
                maxWidth: (colSize / 12) * width,
            },
        ],
        [colSize, alignment, componentStyles, width],
    );
    return <View style={styles}>{children}</View>;
};

export default memo(Column);
