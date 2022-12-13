import { memo, useCallback, useMemo } from 'react';
import { Platform, StyleSheet, useWindowDimensions } from 'react-native';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type { PopoverProps } from '../Popover';
import type { OptionListProps } from '../OptionList';
import type { ActionSheetProps } from '../ActionSheet';
import type { DialogProps } from '../Dialog';

enum DropdownListMode {
    Auto = 'auto',
    Popover = 'popover', // mobile only
    Fullscreen = 'fullscreen', // mobile only
    ActionSheet = 'actionsheet', // mobile only
    Dialog = 'dialog', // large screen only
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
    isOpen?: boolean;
    setIsOpen?: (isOpen: boolean) => void;

    popoverProps?: Omit<PopoverProps, 'triggerRef' | 'onOpen' | 'onClose' | 'isOpen'>;
    actionSheetProps?: Omit<ActionSheetProps, 'children' | 'isOpen' | 'onClose' | 'onOpen'>;
    dialogProps?: Omit<DialogProps, 'isOpen' | 'children'>;
    triggerRef: any;
};

const DropdownList = <TItem, TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>>({
    mode = 'auto',
    popoverProps,
    actionSheetProps,
    dialogProps = {},
    isOpen: isOpenProp,
    setIsOpen: setIsOpenProp,
    onSelectItemChange: onSelectItemChangeProp,
    records,
    optionsThreshold,
    containerStyle,
    triggerRef,
    ...optionListProps
}: Props<TItem, TSection>) => {
    const { OptionList, ActionSheet, Dialog, DropdownListPopover } = useMolecules();
    const componentStyles = useComponentStyles('DropdownList');

    const resolvedMode = useResolvedMode(mode, records, optionsThreshold);

    const listStyles = useMemo(() => {
        const { popoverContainer, ...restStyles } = componentStyles;

        return StyleSheet.flatten([
            resolvedMode === DropdownListMode.Popover ? popoverContainer : {},
            restStyles,
            containerStyle,
        ]);
    }, [componentStyles, resolvedMode, containerStyle]);

    const [isOpen, setIsOpen] = useControlledValue({
        value: isOpenProp,
        onChange: setIsOpenProp,
    });

    const onClose = useCallback(() => {
        if (isOpen) setIsOpen(false);
    }, [isOpen, setIsOpen]);

    const onOpen = useCallback(() => {
        if (!isOpen) setIsOpen(true);
    }, [isOpen, setIsOpen]);

    const onSelectItemChange = useCallback(
        (item: TItem | TItem[]) => {
            onSelectItemChangeProp?.(item);

            setIsOpen(false);
        },
        [setIsOpen, onSelectItemChangeProp],
    );

    const [WrapperComponent, props] = useMemo(() => {
        switch (resolvedMode) {
            case DropdownListMode.ActionSheet:
                return [ActionSheet, { ...actionSheetProps, isOpen, onClose, onOpen }];
            case DropdownListMode.Dialog:
                return [Dialog, { ...dialogProps, isOpen, onClose }];
            default:
                return [DropdownListPopover, { ...popoverProps, triggerRef, isOpen, onClose }];
        }
    }, [
        resolvedMode,
        ActionSheet,
        actionSheetProps,
        isOpen,
        onClose,
        onOpen,
        Dialog,
        dialogProps,
        DropdownListPopover,
        popoverProps,
        triggerRef,
    ]);

    return (
        <WrapperComponent {...(props as any)}>
            <OptionList
                {...optionListProps}
                records={records}
                onSelectItemChange={onSelectItemChange}
                containerStyle={listStyles}
            />
        </WrapperComponent>
    );
};

const useResolvedMode = (
    mode: `${DropdownListMode}`,
    options: { data: any[] }[],
    optionsThreshold: number | undefined,
) => {
    const { width } = useWindowDimensions();

    if (mode !== DropdownListMode.Auto) return mode;

    if (width > 920 || optionsThreshold === undefined) {
        return DropdownListMode.Popover;
    }

    // to avoid looping over all the items, we check if the length of the sections is greater than threshold
    if (options.length > optionsThreshold) return DropdownListMode.Dialog;

    let itemsLength = 0;

    for (const t of options) {
        // we want to stop the loop if the length is already greater than threshold
        if (itemsLength > optionsThreshold) return;

        itemsLength += t?.data.length;
    }

    if (itemsLength > optionsThreshold) return DropdownListMode.Dialog;

    // if less than threshold
    if (Platform.OS === 'ios') return DropdownListMode.ActionSheet;

    return DropdownListMode.Popover;
};

export default memo(DropdownList);
