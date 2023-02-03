import { Children, cloneElement, memo, ReactElement, useMemo } from 'react';
import type { ViewProps } from '@bambooapp/bamboo-atoms';
import { useComponentStyles, useMolecules } from '../../hooks';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
    /** number or design token
     * */
    spacing?: number | string;
};

const AppbarRight = memo(({ children, spacing: spacingProp, style, ...rest }: Props) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Appbar_Right', [
        style,
        spacingProp ? { spacing: spacingProp } : {},
    ]);

    const { spacing, appbarRightStyle } = useMemo(() => {
        const { spacing: _spacing, ...restStyles } = componentStyles;

        return {
            spacing: _spacing,
            appbarRightStyle: restStyles,
        };
    }, [componentStyles]);

    const content = useMemo(
        () =>
            Children.map(children, child => {
                return cloneElement(child, {
                    style: {
                        marginLeft: spacing,
                    },
                });
            }),
        [children, spacing],
    );

    return (
        <View {...rest} style={appbarRightStyle}>
            {content}
        </View>
    );
});

AppbarRight.displayName = 'Appbar_Right';

export default AppbarRight;
