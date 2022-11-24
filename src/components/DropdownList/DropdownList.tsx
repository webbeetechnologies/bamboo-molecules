import { forwardRef, memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';
import type { ActionSheetRef } from 'react-native-actions-sheet';

import { TriggerProps, withPopper } from '../../hocs/withPopper';
import { useComponentStyles, useMolecules } from '../../hooks';
import type { PopoverProps } from '../Popover';
import type { OptionListProps } from '../OptionList';
import type { ActionSheetProps } from '../ActionSheet';
import type { ModalProps } from '../Modal';

enum DropdownListMode {
    Auto = 'auto',
    Popover = 'popover', // mobile only
    Fullscreen = 'fullscreen', // mobile only
    ActionSheet = 'actionsheet', // mobile only
    Modal = 'modal', // large screen only
}

type DefaultSectionT<TItem> = {
    [key: string]: any;
    data: TItem[];
};

export type Props<
    TItem = any,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
> = OptionListProps<TItem, TSection> & {
    mode?: `${DropdownListMode}`;
    // optionsThreshhold: configuration to show maximum number of options in popover/actionsheet when mode == DropdownListMode.auto (default: 5).
    // on reaching threshold, switches to a full screen view in smaller devices.
    optionsThreshold?: number;
    isOpen: boolean;
    onDropdownToggle: (isOpen?: boolean) => void;
    TriggerComponent: (props: TriggerProps | { onPress: () => void }) => JSX.Element;

    popoverProps?: Omit<PopoverProps, 'trigger' | 'onOpen' | 'onClose'>;
    actionSheetProps?: Omit<ActionSheetProps, 'children' | 'onClose' | 'onOpen'>;
    modalProps?: Omit<ModalProps, 'visible'>;
};

const DropdownList = <TItem, TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>>({
    mode = 'auto',
    popoverProps,
    actionSheetProps,
    modalProps = {},
    isOpen,
    onDropdownToggle,
    onSelectItemChange: onSelectItemChangeProp,
    records,
    optionsThreshold,
    containerStyle,
    TriggerComponent,
    ...optionListProps
}: Props<TItem, TSection>) => {
    const { OptionList, ActionSheet, Modal } = useMolecules();
    const componentStyles = useComponentStyles('DropdownList');

    const ref = useRef<ActionSheetRef>(null);
    const dimensions = useWindowDimensions();

    const resolvedMode = useMemo(
        () => resolveMode(mode, records, optionsThreshold, dimensions.width),
        [dimensions.width, mode, optionsThreshold, records],
    );

    const listStyles = useMemo(() => {
        const { popoverContainer, ...restStyles } = componentStyles;

        return StyleSheet.flatten([
            resolvedMode === DropdownListMode.Popover ? popoverContainer : {},
            restStyles,
            containerStyle,
        ]);
    }, [componentStyles, resolvedMode, containerStyle]);

    const [WrapperComponent, props] = useMemo(() => {
        switch (resolvedMode) {
            case DropdownListMode.ActionSheet:
                return [ActionSheet, actionSheetProps];
            case DropdownListMode.Modal:
                return [Modal, modalProps];
            default:
                return [PopoverWrapper, popoverProps];
        }
    }, [resolvedMode, ActionSheet, actionSheetProps, Modal, modalProps, popoverProps]);

    const onClose = useCallback(() => {
        if (isOpen) onDropdownToggle(true);
    }, [isOpen, onDropdownToggle]);

    const onOpen = useCallback(() => {
        if (!isOpen) onDropdownToggle(false);
    }, [isOpen, onDropdownToggle]);

    const onSelectItemChange = useCallback(
        (item: TItem | TItem[]) => {
            onSelectItemChangeProp?.(item);

            if (resolvedMode === DropdownListMode.ActionSheet) {
                ref?.current?.hide();
                return; // because hide() will run onClose which will trigger onDropdownToggle
            }

            onDropdownToggle(true);
        },
        [onDropdownToggle, onSelectItemChangeProp, resolvedMode],
    );

    const onToggleDropdownList = useCallback(() => {
        onDropdownToggle(isOpen);
    }, [isOpen, onDropdownToggle]);

    useEffect(() => {
        if (resolvedMode !== DropdownListMode.ActionSheet) return;

        if (isOpen && !ref?.current?.isOpen()) {
            ref?.current?.show();
            return;
        }

        ref?.current?.hide();
    }, [isOpen, resolvedMode]);

    return (
        <>
            {resolvedMode !== DropdownListMode.Popover && (
                <TriggerComponent onPress={onToggleDropdownList} />
            )}
            <WrapperComponent
                {...(props as any)}
                // for Popover
                trigger={TriggerComponent}
                isOpen={isOpen}
                onOpen={onOpen}
                // for ActionSheet and Popover
                onClose={onClose}
                // for modal
                visible={isOpen}
                onDismiss={onClose}
                onRequestClose={onClose}
                ref={ref}>
                <OptionList
                    {...optionListProps}
                    records={records}
                    onSelectItemChange={onSelectItemChange}
                    containerStyle={listStyles}
                />
            </WrapperComponent>
        </>
    );
};

const resolveMode = (
    mode: `${DropdownListMode}`,
    options: { data: any[] }[],
    optionsThreshold: number | undefined,
    screenWidth: number,
) => {
    if (mode !== DropdownListMode.Auto) return mode;

    if (screenWidth > 920 || optionsThreshold === undefined) {
        return DropdownListMode.Popover;
    }

    // to avoid looping over all the items, we check if the length of the sections is greater than threshold
    if (options.length > optionsThreshold) return DropdownListMode.Modal;

    let itemsLength = 0;

    for (const t of options) {
        // we want to stop the loop if the length is already greater than threshold
        if (itemsLength > optionsThreshold) return;

        itemsLength += t?.data.length;
    }

    if (itemsLength > optionsThreshold) return DropdownListMode.Modal;

    // if less than threshold
    if (Platform.OS === 'ios') return DropdownListMode.ActionSheet;

    return DropdownListMode.Popover;
};

const PopoverWrapper = withPopper<PopoverProps>(() => null);

export default memo(forwardRef(DropdownList));
