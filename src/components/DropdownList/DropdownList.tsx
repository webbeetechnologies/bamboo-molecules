import { withPopper } from '../../hocs/withPopper';
import type { PopoverProps } from '../Popover';
import { useMolecules } from '../../hooks';
import type { OptionListProps } from '../OptionList';

enum DropdownListMode {
    Auto = 'auto',
    Popover = 'popover', // mobile only
    Fullscreen = 'fullscreen', // mobile only
    ActionSheet = 'actionsheet', // mobile only
    Modal = 'modal', // large screen only
}

type DefaultSectionT<TItem> = {
    [key: string]: any;
    data?: TItem;
};

export type Props<
    TItem = any,
    TSection extends DefaultSectionT<TItem> = DefaultSectionT<TItem>,
> = PopoverProps &
    OptionListProps<TItem, TSection> & {
        mode?: `${DropdownListMode}`;
        // optionsThreshhold: configuration to show maximum number of options in popover/actionsheet when mode == DropdownListMode.auto (default: 5).
        // on reaching threshold, switches to a full screen view in smaller devices.
        optionsThreshold?: number;
        onDropdownToggle?: (isOpen?: boolean) => void;
        isOpen?: boolean;
    };

const DropdownList = <TItem, TSection>({
    mode,
    trigger,
    showArrow = false,
    onClose,
    onOpen,
    isOpen,
    defaultIsOpen,
    initialFocusRef,
    finalFocusRef,
    trapFocus,
    triggerRef,

    arrowProps,
    overlayStyles,
    contentStyles,
    contentTextStyles,
    initialTransition,
    animateTransition,
    exitTransition,
    offset,
    shouldFlip,
    crossOffset,
    closeOnScroll,
    scrollRef,
    shouldOverlapWithTrigger,
    placement,
    setOverlayRef,
    ...optionListProps
}: Props<TItem, TSection>) => {
    const { OptionList, Modal } = useMolecules();

    const WrapperComponent = mode === DropdownListMode.Modal ? Modal : PopoverWrapper;

    return (
        <WrapperComponent
            visible={isOpen}
            onDismiss={onClose}
            trigger={trigger}
            showArrow={showArrow}
            onClose={onClose}
            onOpen={onOpen}
            isOpen={isOpen}
            arrowProps={arrowProps}
            defaultIsOpen={defaultIsOpen}
            initialFocusRef={initialFocusRef}
            finalFocusRef={finalFocusRef}
            trapFocus={trapFocus}
            contentStyles={contentStyles}
            contentTextStyles={contentTextStyles}
            overlayStyles={overlayStyles}
            initialTransition={initialTransition}
            animateTransition={animateTransition}
            exitTransition={exitTransition}
            shouldFlip={shouldFlip}
            crossOffset={crossOffset}
            offset={offset}
            closeOnScroll={closeOnScroll}
            scrollRef={scrollRef}
            shouldOverlapWithTrigger={shouldOverlapWithTrigger}
            placement={placement}
            triggerRef={triggerRef}
            setOverlayRef={setOverlayRef}>
            <OptionList {...optionListProps} />
        </WrapperComponent>
    );
};

const PopoverWrapper = withPopper<PopoverProps>(() => null);

export default DropdownList;
