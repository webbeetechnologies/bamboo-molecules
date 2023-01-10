import {
    createContext,
    forwardRef,
    memo,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import type { ViewProps } from 'react-native';
import {
    useComponentStyles,
    useControlledValue,
    useMolecules,
    useSubcomponents,
} from '../../hooks';
import type { WithElements } from '../../types';
import { AccordionContext } from './Accordion';

export type Props = Omit<ViewProps, 'children'> &
    WithElements<ReactNode> & {
        id?: string;
        expanded?: boolean;
        setExpanded?: (expanded: boolean) => void;
        children: ReactElement | ReactElement[];
    };

const AccordionItem = memo(
    forwardRef(
        (
            {
                id,
                expanded: expandedProp,
                setExpanded: setExpandedProp,
                children,
                style,
                ...rest
            }: Props,
            ref: any,
        ) => {
            const { View } = useMolecules();
            const componentStyles = useComponentStyles('AccordionItem', style);
            const [expanded, onExpandedChange] = useControlledValue({
                value: expandedProp,
                onChange: setExpandedProp,
            });

            const expandedInternal = expandedProp !== undefined ? expandedProp : expanded;

            const groupContext = useContext(AccordionContext);

            const { header, content } = useSubcomponents({
                children,
                allowedChildren: ['AccordionItem.Header', 'AccordionItem.Content'],
            });

            useEffect(() => {
                if (groupContext !== null && !id) {
                    throw new Error(
                        'AccordionItem is used inside Accordion without specifying an id prop.',
                    );
                }
            }, [groupContext, id]);

            const contextValue = useMemo(() => {
                const isExpanded = groupContext
                    ? Array.isArray(groupContext.expandedItemIds)
                        ? !!groupContext.expandedItemIds.find(_id => _id === id)
                        : groupContext.expandedItemIds === id
                    : expandedInternal;

                const handleExpandChange =
                    groupContext && id !== undefined
                        ? () => groupContext.onPressItem?.(id)
                        : onExpandedChange;

                return { expanded: isExpanded, onExpandedChange: handleExpandChange };
            }, [groupContext, id, expandedInternal, onExpandedChange]);

            return (
                <View style={componentStyles} {...rest} ref={ref}>
                    <AccordionItemContext.Provider value={contextValue}>
                        {header}
                        {contextValue.expanded ? content : null}
                    </AccordionItemContext.Provider>
                </View>
            );
        },
    ),
);

export const AccordionItemContext = createContext({
    expanded: false,
    onExpandedChange: (_expanded: boolean) => {},
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
