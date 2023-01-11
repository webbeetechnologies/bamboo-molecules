import DrawerCollapsibleItemComponent from './DrawerCollapsibleItem';
import DrawerCollapsibleItemHeader from './DrawerCollapsibleItemHeader';
import DrawerCollapsibleItemContent from './DrawerCollapsibleItemContent';

export const DrawerCollapsibleItem = Object.assign(DrawerCollapsibleItemComponent, {
    Header: DrawerCollapsibleItemHeader,
    Content: DrawerCollapsibleItemContent,
});

export { AccordionHeaderElementProps as DrawerCollapsibleItemHeaderElementProps } from '../../Accordion';

export { default as DrawerCollapsible, Props as DrawerCollapsibleProps } from './DrawerCollapsible';
export { Props as DrawerCollapsibleItemProps } from './DrawerCollapsibleItem';
export { Props as DrawerCollapsibleItemHeaderProps } from './DrawerCollapsibleItemHeader';
export { Props as DrawerCollapsibleItemContentProps } from './DrawerCollapsibleItemContent';

export {
    drawerCollapsibleStyles,
    drawerCollapsibleItemStyles,
    drawerCollapsibleItemHeaderStyles,
    drawerCollapsibleItemContentStyles,
} from './utils';
