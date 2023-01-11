import DrawerComponent from './Drawer';
import DrawerItem from './DrawerItem';
import DrawerItemGroup from './DrawerItemGroup';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';
import { DrawerCollapsible, DrawerCollapsibleItem } from './Collapsible';

export const Drawer = Object.assign(DrawerComponent, {
    Item: DrawerItem,
    ItemGroup: DrawerItemGroup,
    Header: DrawerHeader,
    Content: DrawerContent,
    Footer: DrawerFooter,
    Collapsible: DrawerCollapsible,
    CollapsibleItem: DrawerCollapsibleItem,
});

export { Props as DrawerProps } from './Drawer';
export { Props as DrawerItemProps, DrawerItemElement, DrawerItemElementProps } from './DrawerItem';
export { Props as DrawerItemGroupProps } from './DrawerItem';
export { Props as DrawerContentProps } from './DrawerContent';
export { Props as DrawerHeaderProps } from './DrawerHeader';
export { Props as DrawerFooterProps } from './DrawerFooter';

export {
    drawerStyles,
    drawerItemStyles,
    drawerContentStyles,
    drawerHeaderStyles,
    drawerFooterStyles,
} from './utils';

export {
    drawerCollapsibleStyles,
    drawerCollapsibleItemStyles,
    drawerCollapsibleItemHeaderStyles,
    drawerCollapsibleItemContentStyles,
    DrawerCollapsibleProps,
    DrawerCollapsibleItemProps,
    DrawerCollapsibleItemHeaderProps,
    DrawerCollapsibleItemHeaderElementProps,
    DrawerCollapsibleItemContentProps,
} from './Collapsible';
