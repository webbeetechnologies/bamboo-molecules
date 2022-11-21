import { memo, forwardRef, cloneElement, Children } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import memoize from 'lodash.memoize';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = ViewProps & {};

export const InputGroup = ({ children, style, ...props }: Props, ref: any) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('InputGroup', style);

    return (
        <View {...props} style={componentStyles} ref={ref}>
            {supplyPropsToChildren(children)}
        </View>
    );
};

const supplyPropsToChildren = memoize((children: any) => {
    if (children.length <= 1) return children;

    // if we have enough elements for left, right
    return Children.map(children, (child: JSX.Element, index) => {
        return cloneElement(child, {
            ...child.props,
            style: [
                StyleSheet.flatten(child.props.style || []),
                index === 0
                    ? {
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 0,
                      }
                    : index === children.length - 1
                    ? {
                          borderTopLeftRadius: 0,
                          borderBottomLeftRadius: 0,
                      }
                    : {
                          borderRadius: 0,
                      },
            ],
        });
    });
});

export default memo(forwardRef(InputGroup));
