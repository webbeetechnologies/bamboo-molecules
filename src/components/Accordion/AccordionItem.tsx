import {
    Children,
    createContext,
    FC,
    forwardRef,
    isValidElement,
    memo,
    ReactElement,
    ReactNode,
    useContext,
    useEffect,
    useMemo,
} from 'react';
import type { ViewProps } from 'react-native';
import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
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
            const [expanded, setExpanded] = useControlledValue({
                value: expandedProp,
                onChange: setExpandedProp,
            });

            const expandedInternal = expandedProp !== undefined ? expandedProp : expanded;

            const groupContext = useContext(AccordionContext);

            const { header, content } = useMemo(
                () =>
                    Children.map(children, child => child).reduce(
                        (context, child) => {
                            if (!isValidElement(child)) return context;

                            if (
                                (child.type as FC).displayName !== 'AccordionItem.Header' &&
                                (child.type as FC).displayName !== 'AccordionItem.Content'
                            ) {
                                return context;
                            }

                            const name = (child.type as FC).displayName
                                ?.split('.')?.[1]
                                .toLowerCase();

                            if (!name) return context;

                            return {
                                ...context,
                                [name]: child,
                            };
                        },
                        {
                            header: <></>,
                            content: <></>,
                        },
                    ),
                [children],
            );

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

                const handleExpand =
                    groupContext && id !== undefined
                        ? () => groupContext.onPressItem?.(id)
                        : setExpanded;

                return { expanded: isExpanded, setExpanded: handleExpand };
            }, [groupContext, id, expandedInternal, setExpanded]);

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
    setExpanded: (_expanded: boolean) => {},
});

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
