import { createContext, memo, useMemo } from 'react';
import { useComponentStyles, useMolecules, useSubcomponents } from '../../hooks';
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
            containerStyle: [
                scrolling ? { backgroundColor: 'colors.surfaceVariant' } : {},
                restStyles,
            ],
            innerContainerStyle: innerContainer,
        };
    }, [componentStyles, scrolling]);

    const { left, right, title } = useSubcomponents({
        children,
        allowedChildren: ['Appbar.Left', 'Appbar.Right', 'Appbar.Title'],
    });

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
