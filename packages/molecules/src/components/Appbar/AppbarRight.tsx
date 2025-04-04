import { Children, cloneElement, memo, ReactElement, useMemo } from 'react';
import { View, type ViewProps } from 'react-native';
import { appbarRight } from './utils';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
    /** number or design token
     * */
    spacing?: number | string;
};

const AppbarRight = memo(({ children, spacing, style, ...rest }: Props) => {
    const componentStyles = useMemo(() => [appbarRight.root, style], [style]);

    const { appbarRightStyle } = useMemo(() => {
        return {
            appbarRightStyle: componentStyles,
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
