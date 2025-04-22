import AccordionItemComponent from './AccordionItem';
import AccordionItemHeader from './AccordionItemHeader';
import AccordionItemContent from './AccordionItemContent';
import AccordionDefault from './Accordion';
import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';

const AccordionItemDefault = Object.assign(AccordionItemComponent, {
    Header: AccordionItemHeader,
    Content: AccordionItemContent,
});

registerMoleculesComponents({
    Accordion: AccordionDefault,
    AccordionItem: AccordionItemDefault,
});

export const Accordion = getRegisteredComponentWithFallback('Accordion', AccordionDefault);
export const AccordionItem = getRegisteredComponentWithFallback(
    'AccordionItem',
    AccordionItemDefault,
);

export type { Props as AccordionProps } from './Accordion';
export type { Props as AccordionItemProps } from './AccordionItem';
export type {
    Props as AccordionItemHeaderProps,
    AccordionHeaderElementProps,
} from './AccordionItemHeader';
export type { Props as AccordionItemContentProps } from './AccordionItemContent';

export {
    accordionStyles,
    accordionItemStyles,
    accordionItemHeaderStyles,
    accordionItemContentStyles,
} from './utils';
