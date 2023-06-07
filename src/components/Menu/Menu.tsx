import { createContext, memo, ReactElement, useMemo } from 'react';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { PopoverProps } from '../Popover';
import type { ViewStyle } from 'react-native';

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

const Menu = ({
    isOpen,
    onClose,
    children,
    style,
    backdropStyles = {},
    containerStyle: containerStyleProp = {},
    closeOnSelect = true,
    ...rest
}: Props) => {
    const { Popover } = useMolecules();
    const componentStyles = useComponentStyles('Menu', [
        {
            backdrop: backdropStyles,
            container: containerStyleProp,
        },
        style,
    ]);

    const { backdropStyle, containerStyle, contentTextStyle } = useMemo(() => {
        const { backdrop, container, ...restStyle } = componentStyles;

        return {
            backdropStyle: backdrop,
            containerStyle: container,
            contentTextStyle: restStyle,
        };
    }, [componentStyles]);

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
