import { memo, forwardRef, cloneElement, Children, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';

import { useComponentStyles, useMolecules } from '../../hooks';
import { defaultStyles } from './utils';

enum Orientation {
    Horizontal = 'horizontal',
    Vertical = 'vertical',
}

export type Props = ViewProps & {
    orientation?: `${Orientation}`;
    borderRadius?: number | string;
};

export const ElementGroup = (
    {
        orientation = Orientation.Horizontal,
        children,
        style,
        borderRadius: borderRadiusProp = 'shapes.corner.extraSmall',
        ...props
    }: Props,
    ref: any,
) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('ElementGroup', [
        style,
        { borderRadius: borderRadiusProp },
    ]);

    const { containerStyle, borderRadius } = useMemo(() => {
        const { borderRadius: _borderRadius, ...restStyles } = componentStyles;

        return {
            containerStyle: [
                orientation === Orientation.Vertical
                    ? defaultStyles.vertical
                    : defaultStyles.horizontal,
                restStyles,
            ],
            borderRadius: _borderRadius,
        };
    }, [componentStyles, orientation]);

    const modifiedChildren = useMemo(() => {
        if (!children) return null;

        if (!Array.isArray(children) || children.length <= 1) return children;

        // if we have enough elements for left, right
        return Children.map(children, (child: JSX.Element, index) => {
            const [firstBorderProp, lastBorderProp] = {
                [Orientation.Horizontal]: ['borderTopRightRadius', 'borderBottomLeftRadius'],
                [Orientation.Vertical]: ['borderBottomLeftRadius', 'borderTopRightRadius'],
            }[orientation as Orientation];

            const isFirstChild = index === 0;
            const isLastChild = index === children.length - 1;

            const prop = isFirstChild ? 'first' : isLastChild ? 'last' : 'middle';

            const borderRadiusStyles = {
                first: {
                    borderTopLeftRadius: borderRadius,
                    [firstBorderProp]: 0,
                    [lastBorderProp]: borderRadius,
                    borderBottomRightRadius: 0,
                },
                middle: {
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0,
                },
                last: {
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: borderRadius,
                    [firstBorderProp]: borderRadius,
                    [lastBorderProp]: 0,
                },
            };

            return cloneElement(child, {
                ...child.props,
                style: [StyleSheet.flatten(child.props.style || []), borderRadiusStyles[prop]],
            });
        });
    }, [borderRadius, children, orientation]);

    return (
        <View {...props} style={containerStyle} ref={ref}>
            {modifiedChildren}
        </View>
    );
};

export default memo(forwardRef(ElementGroup));
