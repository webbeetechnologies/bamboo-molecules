import {
    Children,
    cloneElement,
    FC,
    isValidElement,
    memo,
    ReactElement,
    useCallback,
    useMemo,
    useRef,
} from 'react';
import { ViewStyle, Platform, Pressable, TextStyle, StyleSheet } from 'react-native';

import { useToggle } from '../../hooks';
import type { IPlacement } from '../Popper/types';
import { popoverFactory } from '../Popover';

export type Props = {
    fadeInDelay?: number;
    fadeOutDelay?: number;
    showArrow?: boolean;
    placement?: IPlacement;
    contentTextStyles?: TextStyle;
    style?: ViewStyle;
    children: ReactElement | ReactElement[];
};

const Popover = popoverFactory('Tooltip');

const Tooltip = ({
    style,
    children,
    fadeInDelay = 100,
    fadeOutDelay = 100,
    showArrow = false,
    placement,
    contentTextStyles,
}: Props) => {
    const { state: isOpen, setState: setIsOpen } = useToggle(false);
    const triggerRef = useRef(null);

    const onClose = useCallback(() => {
        setTimeout(() => setIsOpen(false), fadeOutDelay);
    }, [fadeOutDelay, setIsOpen]);

    const onOpen = useCallback(() => {
        setTimeout(() => setIsOpen(true), fadeInDelay);
    }, [fadeInDelay, setIsOpen]);

    const setPopoverOpen = useCallback(
        (_isOpen: boolean) => {
            setTimeout(() => setIsOpen(_isOpen), isOpen ? fadeInDelay : fadeOutDelay);
        },
        [fadeInDelay, fadeOutDelay, isOpen, setIsOpen],
    );

    const { trigger, content } = useMemo(
        () =>
            Children.map(children, child => child).reduce(
                (context, child) => {
                    if (!isValidElement(child)) return context;

                    if (
                        (child.type as FC).displayName !== 'Tooltip.Trigger' &&
                        (child.type as FC).displayName !== 'Tooltip.Content'
                    ) {
                        return context;
                    }

                    if ((child.type as FC).displayName === 'Tooltip.Trigger') {
                        return {
                            ...context,
                            trigger: Array.isArray((child?.props as any)?.children)
                                ? (child?.props as any)?.children[0]
                                : (child?.props as any)?.children,
                        };
                    }

                    return {
                        ...context,
                        content: [...context.content, child],
                    };
                },
                {
                    trigger: <></>,
                    content: [] as ReactElement[],
                },
            ),
        [children],
    );

    return (
        <>
            <Trigger children={trigger} triggerRef={triggerRef} onClose={onClose} onOpen={onOpen} />
            <Popover
                placement={placement}
                showArrow={showArrow}
                backdropStyles={styles.backdrop}
                triggerRef={triggerRef}
                isOpen={isOpen}
                setIsOpen={setPopoverOpen}
                contentStyles={style}
                contentTextStyles={contentTextStyles}
                onClose={onClose}>
                {content}
            </Popover>
        </>
    );
};

const Trigger = memo(
    ({
        children,
        triggerRef,
        onOpen,
        onClose,
    }: {
        children: ReactElement;
        triggerRef: any;
        onOpen: () => void;
        onClose: () => void;
    }) => {
        const isWeb = Platform.OS === 'web';

        const onPress = useCallback(() => {
            children?.props?.onPress?.();
        }, [children?.props]);

        const onLongPress = useCallback(() => {
            children?.props?.onLongPress?.();

            onOpen();
        }, [onOpen, children?.props]);

        const onPressOut = useCallback(() => {
            children?.props?.onPressOut?.();

            onClose();
        }, [onClose, children?.props]);

        const onHoverIn = useCallback(() => {
            children?.props?.onHoverIn?.();

            onOpen();
        }, [onOpen, children?.props]);

        const onHoverOut = useCallback(() => {
            children?.props?.onHoverOut?.();

            onClose();
        }, [onClose, children?.props]);

        return isWeb ? (
            <Pressable
                ref={triggerRef}
                onPress={onPress}
                // @ts-ignore
                onHoverIn={onHoverIn}
                onHoverOut={onHoverOut}>
                {children}
            </Pressable>
        ) : (
            cloneElement(children, {
                ref: triggerRef,
                onLongPress,
                onPressOut,
                onPress,
            })
        );
    },
);

const styles = StyleSheet.create({
    backdrop: {
        display: 'none',
    },
});

export default memo(Tooltip);
