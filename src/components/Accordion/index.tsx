import AccordionItemComponent from './AccordionItem';
import AccordionItemHeader from './AccordionItemHeader';
import AccordionItemContent from './AccordionItemContent';

export const AccordionItem = Object.assign(AccordionItemComponent, {
    Header: AccordionItemHeader,
    Content: AccordionItemContent,
});

export { default as Accordion, Props as AccordionProps } from './Accordion';
export { Props as AccordionItemProps } from './AccordionItem';
export {
    Props as AccordionItemHeaderProps,
    AccordionHeaderElementProps,
} from './AccordionItemHeader';
export { Props as AccordionContentProps } from './AccordionItemContent';

export {
    accordionStyles,
    accordionItemStyles,
    accordionItemHeaderStyles,
    accordionItemContentStyles,
} from './utils';
