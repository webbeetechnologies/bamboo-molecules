import { memo, useMemo } from 'react';
import type { ViewProps } from '@webbee/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { HorizontalDividerProps } from '../HorizontalDivider';

export type Props = ViewProps & {
    title?: string;
    showDivider?: boolean;
    dividerProps?: HorizontalDividerProps;
};

const DrawerItemGroup = memo(
    ({ title, style, children, showDivider, dividerProps = {}, ...rest }: Props) => {
        const { View, Text, HorizontalDivider } = useMolecules();
        const componentStyles = useComponentStyles('Drawer_ItemGroup', style);

        const { containerStyle, titleStyle, dividerStyle, dividerRestProps } = useMemo(() => {
            const { title: _titleStyle, divider: _dividerStyle, ...restStyles } = componentStyles;
            const { style: dividerStyleProp, ..._dividerRestProps } = dividerProps;

            return {
                containerStyle: restStyles,
                titleStyle: _titleStyle,
                dividerStyle: [_dividerStyle, dividerStyleProp],
                dividerRestProps: _dividerRestProps,
            };
        }, [componentStyles, dividerProps]);

        return (
            <View style={containerStyle} {...rest}>
                <>{title && <Text style={titleStyle}>{title}</Text>}</>
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

DrawerItemGroup.displayName = 'Drawer.ItemGroup';

export default DrawerItemGroup;
