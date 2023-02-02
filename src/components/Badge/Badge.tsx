import { memo, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { TextProps } from '@webbee/bamboo-atoms';

export type Props = Omit<ViewProps, 'children'> & {
    label?: string | number;
    size?: 'sm' | 'md';
    labelProps?: Omit<TextProps, 'children'>;
};

const Badge = ({ style, label, size = 'md', labelProps = {}, ...rest }: Props) => {
    const { View, Text } = useMolecules();

    const componentStyles = useComponentStyles(
        'Badge',
        [
            style,
            {
                label: labelProps.style || {},
            },
        ],
        {
            size: size === 'md' && label ? 'md' : 'sm',
        },
    );

    const { containerStyle, labelStyle } = useMemo(() => {
        const { label: _label, ...restStyle } = componentStyles;

        return {
            containerStyle: restStyle,
            labelStyle: _label,
        };
    }, [componentStyles]);

    return (
        <View style={containerStyle} {...rest}>
            {size !== 'sm' && (
                <Text {...labelProps} style={labelStyle}>
                    {label}
                </Text>
            )}
        </View>
    );
};

export default memo(Badge);
