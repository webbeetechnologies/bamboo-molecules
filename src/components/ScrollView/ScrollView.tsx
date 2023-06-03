import { ForwardedRef, forwardRef, memo, RefAttributes, useMemo } from 'react';
import type { ScrollViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useComponentStyles } from '../../hooks';

export type ScrollViewRef = ScrollView;

export type Props = ScrollViewProps & RefAttributes<ScrollViewRef> & {};

const ComponentTemplate = (
    { style, contentContainerStyle: contentContainerStyleProp, ...rest }: Props,
    ref: ForwardedRef<ScrollViewRef>,
) => {
    const componentStyles = useComponentStyles('ScrollView', [
        style,
        { contentContainerStyle: contentContainerStyleProp },
    ]);

    const { containerStyle, contentContainerStyle } = useMemo(() => {
        const { contentContainerStyle: _contentContainerStyle, ...restStyle } = componentStyles;

        return {
            containerStyle: restStyle,
            contentContainerStyle: _contentContainerStyle,
        };
    }, []);

    return (
        <ScrollView
            ref={ref}
            style={containerStyle}
            contentContainerStyle={contentContainerStyle}
            {...rest}
        />
    );
};

export default memo(forwardRef(ComponentTemplate));
