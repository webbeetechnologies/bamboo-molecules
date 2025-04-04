import AccordionItemComponent from './AccordionItem';
import AccordionItemHeader from './AccordionItemHeader';
import AccordionItemContent from './AccordionItemContent';
import AccordionDefault from './Accordion';
import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';

const AccordionItemDefault = Object.assign(AccordionItemComponent, {
    Header: AccordionItemHeader,
    Content: AccordionItemContent,
});

registerMoleculesComponents({
    Accordion: AccordionDefault,
    AccordionItem: AccordionItemDefault,
});

export const Accordion = (getRegisteredMoleculesComponent('Accordion') ??
    AccordionDefault) as typeof AccordionDefault;
export const AccordionItem = (getRegisteredMoleculesComponent('AccordionItem') ??
    AccordionItemDefault) as typeof AccordionItemDefault;

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
