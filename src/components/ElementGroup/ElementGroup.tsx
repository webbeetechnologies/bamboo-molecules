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
};

export const ElementGroup = (
    { orientation = Orientation.Horizontal, children, style, ...props }: Props,
    ref: any,
) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('ElementGroup', style);

    const styles = useMemo(() => {
        return [
            orientation === Orientation.Vertical
                ? defaultStyles.vertical
                : defaultStyles.horizontal,
            componentStyles,
        ];
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
                    [firstBorderProp]: 0,
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
                    [lastBorderProp]: 0,
                },
            };

            return cloneElement(child, {
                ...child.props,
                style: [StyleSheet.flatten(child.props.style || []), borderRadiusStyles[prop]],
            });
        });
    }, [children, orientation]);

    return (
        <View {...props} style={styles} ref={ref}>
            {modifiedChildren}
        </View>
    );
};

export default memo(forwardRef(ElementGroup));
