import {
    componentsRepository,
    componentsStylesRepository,
} from '@bambooapp/bamboo-molecules/src/core/componentsRegistry';
import { memo, useMemo } from 'react';
import type { ViewProps, TextProps } from 'react-native';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type Props = Omit<ViewProps, 'children'> & {
    label?: string | number;
    size?: 'sm' | 'md';
    labelProps?: Omit<TextProps, 'children'>;
};

const Badge = ({ style, label, size = 'md', labelProps = {}, ...rest }: Props) => {
    // const componentStyles = useComponentStyles(
    //     'Badge',
    //     [
    //         style,
    //         {
    //             label: labelProps.style || {},
    //         },
    //     ],
    //     {
    //         size: !label ? 'sm' : size,
    //     },
    // );

    styles.useVariants({
        size: !label ? 'sm' : size,
    });

    const { containerStyle, labelStyle } = useMemo(() => {
        return {
            containerStyle: styles.root,
            labelStyle: styles.label,
        };
    }, []);

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

const defaultStyles = StyleSheet.create(theme => ({
    root: {
        backgroundColor: theme.colors.red,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4,

        variants: {
            size: {
                sm: {
                    width: 6,
                    height: 6,
                    paddingHorizontal: 0,
                },
                md: {
                    minWidth: 16,
                    minHeight: 16,
                },
            },
        },
    },

    label: {
        color: 'white',
        // ...theme.typescale.labelSmall,
    },
}));

componentsStylesRepository.registerOne('Badge', defaultStyles);

const styles = componentsStylesRepository.get('Badge');

componentsRepository.registerOne('Badge', memo(Badge));

export default componentsRepository.get('Badge');
