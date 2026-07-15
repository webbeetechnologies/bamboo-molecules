import { getRegisteredComponentWithFallback } from '../../core';
import AccordionDefault from './Accordion';
import AccordionItemComponent from './AccordionItem';
import AccordionItemContent from './AccordionItemContent';
import AccordionItemHeader from './AccordionItemHeader';

export const Accordion = getRegisteredComponentWithFallback('Accordion', AccordionDefault);
// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const AccordionItem = Object.assign(
    getRegisteredComponentWithFallback('AccordionItem', AccordionItemComponent),
    {
        Header: AccordionItemHeader,
        Content: AccordionItemContent,
    },
);

export type { Props as AccordionProps } from './Accordion';
export type { Props as AccordionItemProps } from './AccordionItem';
export type { Props as AccordionItemContentProps } from './AccordionItemContent';
export type {
    AccordionHeaderElementProps,
    Props as AccordionItemHeaderProps,
} from './AccordionItemHeader';
export {
    accordionItemContentStyles,
    accordionItemHeaderStyles,
    accordionItemStyles,
    accordionStyles,
} from './utils';
