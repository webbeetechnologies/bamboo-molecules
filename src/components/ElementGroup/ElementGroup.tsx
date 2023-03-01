import { memo, forwardRef, cloneElement, Children, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewProps } from '@bambooapp/bamboo-atoms';

import { useComponentStyles, useMolecules } from '../../hooks';
import { isNil } from '../../utils';
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
        borderRadius: borderRadiusProp,
        ...props
    }: Props,
    ref: any,
) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('ElementGroup', [
        style,
        !isNil(borderRadiusProp) ? { borderRadius: borderRadiusProp } : {},
    ]);

    const { containerStyle, borderRadius, borderRadiuses } = useMemo(() => {
        const {
            borderRadius: _borderRadius,
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomLeftRadius,
            borderBottomRightRadius,
            ...restStyles
        } = componentStyles;

        return {
            containerStyle: [
                orientation === Orientation.Vertical
                    ? defaultStyles.vertical
                    : defaultStyles.horizontal,
                restStyles,
            ],
            borderRadius: _borderRadius,
            borderRadiuses: {
                borderTopLeftRadius,
                borderTopRightRadius,
                borderBottomLeftRadius,
                borderBottomRightRadius,
            },
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

            type KeyOfBorderRadiuses = keyof typeof borderRadiuses;

            const mapBorderRadiusFromProp = {
                [firstBorderProp]: !isNil(borderRadiuses[firstBorderProp as KeyOfBorderRadiuses])
                    ? borderRadiuses[firstBorderProp as KeyOfBorderRadiuses]
                    : borderRadius,
                [lastBorderProp]: !isNil(borderRadiuses[lastBorderProp as KeyOfBorderRadiuses])
                    ? borderRadiuses[lastBorderProp as KeyOfBorderRadiuses]
                    : borderRadius,
            };

            const borderRadiusStyles = {
                first: {
                    [firstBorderProp]: 0,
                    borderBottomRightRadius: 0,

                    borderTopLeftRadius: !isNil(borderRadiuses.borderTopLeftRadius)
                        ? borderRadiuses.borderTopLeftRadius
                        : borderRadius,
                    [lastBorderProp]: mapBorderRadiusFromProp[lastBorderProp],
                },
                middle: {
                    borderTopLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    borderTopRightRadius: 0,
                    borderBottomLeftRadius: 0,
                },
                last: {
                    borderTopLeftRadius: 0,
                    [lastBorderProp]: 0,

                    borderBottomRightRadius: !isNil(borderRadiuses.borderBottomRightRadius)
                        ? borderRadiuses.borderBottomRightRadius
                        : borderRadius,
                    [firstBorderProp]: mapBorderRadiusFromProp[firstBorderProp],
                },
            };

            return cloneElement(child, {
                ...child.props,
                style: [StyleSheet.flatten(child.props.style || []), borderRadiusStyles[prop]],
            });
        });
    }, [borderRadius, borderRadiuses, children, orientation]);

    return (
        <View {...props} style={containerStyle} ref={ref}>
            {modifiedChildren}
        </View>
    );
};

export default memo(forwardRef(ElementGroup));
