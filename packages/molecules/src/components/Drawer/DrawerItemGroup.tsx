import { memo, ReactNode, useMemo } from 'react';
import { TextProps, View, type ViewProps } from 'react-native';
import { Text } from '../Text';

import { HorizontalDivider, type HorizontalDividerProps } from '../HorizontalDivider';
import { drawerItemGroupStyles } from './utils';

export type Props = ViewProps & {
    title?: ReactNode;
    showDivider?: boolean;
    dividerProps?: HorizontalDividerProps;
    titleProps?: TextProps;
};

const DrawerItemGroup = memo(
    ({
        title,
        style,
        children,
        showDivider,
        dividerProps = {},
        titleProps = {},
        ...rest
    }: Props) => {
        const { containerStyle, titleStyle, dividerStyle, dividerRestProps } = useMemo(() => {
            const { title: _titleStyle, divider: _dividerStyle } = drawerItemGroupStyles;
            const { style: dividerStyleProp, ..._dividerRestProps } = dividerProps;

            return {
                containerStyle: [drawerItemGroupStyles.root, style],
                titleStyle: _titleStyle,
                dividerStyle: [_dividerStyle, dividerStyleProp],
                dividerRestProps: _dividerRestProps,
            };
        }, [dividerProps, style]);

        return (
            <View style={containerStyle} {...rest}>
                <>
                    {title && (
                        <Text {...titleProps} style={[titleStyle, titleProps?.style]}>
                            {title}
                        </Text>
                    )}
                </>
                {children}
                <>
                    {showDivider && (
                        <HorizontalDivider style={dividerStyle} {...dividerRestProps} />
                    )}
                </>
            </View>
        );
    },
);

DrawerItemGroup.displayName = 'Drawer_ItemGroup';

export default DrawerItemGroup;
