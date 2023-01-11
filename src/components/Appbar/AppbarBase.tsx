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

    const { Appbar_Left, Appbar_Right, Appbar_Title } = useSubcomponents({
        children,
        allowedChildren: ['Appbar_Left', 'Appbar_Right', 'Appbar_Title'],
    });

    const contextValue = useMemo(() => ({ type: _type }), [_type]);

    return (
        <Surface elevation={elevation} style={containerStyle} {...rest}>
            <AppbarContext.Provider value={contextValue}>
                <View style={innerContainerStyle}>
                    {Appbar_Left[0]}
                    <>
                        {_type === 'center-aligned' || _type === 'small' ? (
                            Appbar_Title[0]
                        ) : (
                            <View />
                        )}
                    </>
                    {Appbar_Right[0]}
                </View>
                <>{(_type === 'medium' || _type === 'large') && Appbar_Title[0]}</>
            </AppbarContext.Provider>
        </Surface>
    );
};

export const AppbarContext = createContext<{ type: AppbarType }>({
    type: 'center-aligned',
});

export default memo(AppbarBase);
