import { Children, createContext, FC, isValidElement, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { AppbarBaseProps, AppbarType } from './types';

const AppbarBase = ({
    _type = 'center-aligned',
    elevation = 0,
    children,
    style,
    innerContainerStyle: innerContainerStyleProp = {},
    scrolling = false,
    ...rest
}: AppbarBaseProps) => {
    const { Surface, View } = useMolecules();
    const componentStyles = useComponentStyles('Appbar', [
        style,
        {
            innerContainer: innerContainerStyleProp,
        },
    ]);

    const { containerStyle, innerContainerStyle } = useMemo(() => {
        const { innerContainer, ...restStyles } = componentStyles;

        return {
            containerStyle: restStyles,
            innerContainerStyle: innerContainer,
        };
    }, [componentStyles]);

    const { left, right, title } = useMemo(
        () =>
            Children.map(children, child => child).reduce(
                (context, child) => {
                    if (!isValidElement(child)) return context;

                    if (
                        (child.type as FC).displayName !== 'Appbar.Left' &&
                        (child.type as FC).displayName !== 'Appbar.Right' &&
                        (child.type as FC).displayName !== 'Appbar.Title'
                    ) {
                        return context;
                    }

                    switch ((child.type as FC).displayName) {
                        case 'Appbar.Left':
                            return {
                                ...context,
                                // this will make sure we only take the last child as the trigger
                                left: child,
                            };
                        case 'Appbar.Right':
                            return {
                                ...context,
                                // this will make sure we only take the last child as the trigger
                                right: child,
                            };
                        case 'Appbar.Title':
                            return {
                                ...context,
                                title: child,
                            };
                        default:
                            return context;
                    }
                },
                {
                    left: <></>,
                    right: <></>,
                    title: <></>,
                },
            ),
        [children],
    );

    const contextValue = useMemo(() => ({ type: _type }), [_type]);

    return (
        <Surface elevation={elevation} style={containerStyle} {...rest}>
            <AppbarContext.Provider value={contextValue}>
                <View style={innerContainerStyle}>
                    {left}
                    <>{_type === 'center-aligned' || _type === 'small' ? title : <View />}</>
                    {right}
                </View>
                <>{(_type === 'medium' || _type === 'large') && title}</>
            </AppbarContext.Provider>
        </Surface>
    );
};

export const AppbarContext = createContext<{ type: AppbarType }>({
    type: 'center-aligned',
});

export default memo(AppbarBase);
