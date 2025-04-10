import { memo, useMemo } from 'react';
import { type ViewProps, type TextProps, View } from 'react-native';
import { badgeStyles } from './utils';
import { Text } from '../Text';

export type Props = Omit<ViewProps, 'children'> & {
    label?: string | number;
    size?: 'sm' | 'md';
    labelProps?: Omit<TextProps, 'children'>;
};

const Badge = ({ style, label, size = 'md', labelProps = {}, ...rest }: Props) => {
    badgeStyles.useVariants({
        size: !label ? 'sm' : size,
    });

    const componentStyles = useMemo(() => [badgeStyles.root, style], [style]);

    const { containerStyle, labelStyle } = useMemo(() => {
        return {
            containerStyle: componentStyles,
            labelStyle: [badgeStyles.label, labelProps?.style],
        };
    }, [componentStyles, labelProps?.style]);

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
