import {
    Children,
    createContext,
    FC,
    forwardRef,
    isValidElement,
    memo,
    ReactElement,
    useCallback,
    useMemo,
} from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';

export type Props = Omit<ViewProps, 'children'> & {
    children: ReactElement | ReactElement[];
    expandedItemIds?: string | string[];
    defaultExpandedItemIds?: string | string[];
    onChange?: (expandedItems: string | string[]) => void;
    multiple?: boolean;
};

const Accordion = (
    {
        children: childrenProp,
        style,
        expandedItemIds: expandedItemIdsProp,
        defaultExpandedItemIds,
        onChange: onChangeProp,
        multiple = false,
        ...rest
    }: Props,
    ref: any,
) => {
    const { View } = useMolecules();
    const componentStyles = useComponentStyles('Accordion', style);
    const [expandedItemIds, onChange] = useControlledValue({
        value: expandedItemIdsProp,
        defaultValue: defaultExpandedItemIds,
        onChange: onChangeProp,
    });

    const children = useMemo(
        () =>
            Children.map(childrenProp, child => child).reduce((context, child) => {
                if (!isValidElement(child)) return context;

                if ((child.type as FC).displayName !== 'AccordionItem') {
                    return context;
                }

                return [...context, child];
            }, [] as ReactElement[]),
        [childrenProp],
    );

    const onPressItem = useCallback(
        (id: string) => {
            const isSelected = Array.isArray(expandedItemIds)
                ? expandedItemIds.find(_id => _id === id)
                : expandedItemIds === id;

            const multipleValue = Array.isArray(expandedItemIds)
                ? isSelected
                    ? expandedItemIds.filter(_id => _id !== id)
                    : [...expandedItemIds, id]
                : [id];

            const singleValue = !isSelected ? id : '';

            onChange(multiple ? multipleValue : singleValue);
        },
        [multiple, onChange, expandedItemIds],
    );

    const contextValue = useMemo(() => {
        return {
            expandedItemIds,
            onChange,
            onPressItem,
            multiple,
        };
    }, [expandedItemIds, multiple, onChange, onPressItem]);

    return (
        <View style={componentStyles} {...rest} ref={ref}>
            <AccordionContext.Provider value={contextValue}>{children}</AccordionContext.Provider>
        </View>
    );
};

export type AccordionContextType = {
    expandedItemIds: string | string[] | undefined;
    onChange: ((expandedItems: string | string[]) => void) | undefined;
    onPressItem: ((id: string) => void) | undefined;
    multiple: boolean;
} | null;

export const AccordionContext = createContext<AccordionContextType>(null);

export default memo(forwardRef(Accordion));
