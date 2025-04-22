import { createContext, memo, ReactElement, useMemo } from 'react';

import { Popover, type PopoverProps } from '../Popover';
import type { ViewStyle } from 'react-native';
import { menuStyles } from './utils';

export type Props = Omit<
    PopoverProps,
    'setIsOpen' | 'contentTextStyles' | 'contentStyles' | 'onClose' | 'children'
> & {
    containerStyle?: ViewStyle;
    style?: ViewStyle;
    closeOnSelect?: boolean;
    onClose: () => void;
    children: ReactElement | ReactElement[];
};

const emptyObj = {} as ViewStyle;

const Menu = ({
    isOpen,
    onClose,
    children,
    style,
    backdropStyles = emptyObj,
    containerStyle: containerStyleProp = emptyObj,
    closeOnSelect = true,
    ...rest
}: Props) => {
    const { backdropStyle, containerStyle, contentTextStyle } = useMemo(() => {
        const { backdrop, container } = menuStyles;

        return {
            backdropStyle: [backdrop, backdropStyles] as unknown as ViewStyle,
            containerStyle: [container, containerStyleProp] as unknown as ViewStyle,
            contentTextStyle: [menuStyles.root, style] as unknown as ViewStyle,
        };
    }, [backdropStyles, containerStyleProp, style]);

    const contextValue = useMemo(
        () => ({
            closeOnSelect,
            onClose,
        }),
        [closeOnSelect, onClose],
    );

    // const { menuItemsLength } = useMemo(
    //     () => ({
    //         menuItemsLength:
    //             Children.map(children, child => child)?.filter(
    //                 child => (child.type as FC)?.displayName === 'MenuItem',
    //             )?.length || 0,
    //     }),
    //     [children],
    // );
    //
    // console.log({ menuItemsLength });

    return (
        <Popover
            isOpen={isOpen}
            onClose={onClose}
            backdropStyles={backdropStyle}
            contentStyles={containerStyle}
            contentTextStyles={contentTextStyle}
            placement="bottom left"
            {...rest}>
            <MenuContext.Provider value={contextValue}>{children}</MenuContext.Provider>
        </Popover>
    );
};

export const MenuContext = createContext({
    closeOnSelect: true,
    onClose: () => {},
});

export default memo(Menu);
