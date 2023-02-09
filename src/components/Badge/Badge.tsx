import { memo, useMemo } from 'react';
import type { ViewProps } from 'react-native';
import type { TextProps } from '@bambooapp/bamboo-atoms';

import { useComponentStyles, useMolecules } from '../../hooks';

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
            size: !label ? 'sm' : size,
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
            {label && size !== 'sm' && (
                <Text {...labelProps} style={labelStyle}>
                    {label}
                </Text>
            )}
        </View>
    );
};

export default memo(Badge);
