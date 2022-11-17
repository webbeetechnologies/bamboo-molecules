import { memo, forwardRef, cloneElement, Children } from 'react';
import { StyleSheet } from 'react-native';
import type { ViewProps } from '@webbee/bamboo-atoms';
import memoize from 'lodash.memoize';
import { useComponentStyles, useMolecules } from '../../hooks';
import { getAttachedChildren } from './utils';

export type Props = ViewProps & {};

export const InputGroup = ({ children, style, ...props }: Props, ref: any) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('InputGroup', style);

    return (
        <View {...props} style={componentStyles} ref={ref}>
            {supplyPropsToChildren(getAttachedChildren(children))}
        </View>
    );
};

const supplyPropsToChildren = memoize((children: any) => {
    // if we have enough elements for left, right
    if (children.length >= 2) {
        const result = [];

        // we want last child to have borderLeft 0
        const firstChild = children[0];
        const firstChildProps = {
            ...firstChild.props,
            style: [
                StyleSheet.flatten(firstChild.props.style || []),
                {
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                },
            ],
        };

        result.push(cloneElement(firstChild, firstChildProps, firstChild.props.children));

        // we want all the middle children to have borderRadius 0
        for (let i = 1; i < children.length - 1; i++) {
            const child = children[i];
            const newProps = {
                ...child.props,
                style: [
                    StyleSheet.flatten(child.props.style || []),
                    {
                        borderRadius: '0',
                    },
                ],
            };
            result.push(cloneElement(child, newProps, child.props.children));
        }

        // we want last child to have borderLeft 0
        const lastChild = children[children.length - 1];
        const lastChildProps = {
            ...lastChild.props,
            style: [
                StyleSheet.flatten(lastChild.props.style || []),
                {
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                },
            ],
        };

        result.push(cloneElement(lastChild, lastChildProps, lastChild.props.children));

        return result;
    }

    return Children.map(children, (child: JSX.Element) => {
        return cloneElement(child, {}, child.props.children);
    });
});

export default memo(forwardRef(InputGroup));
