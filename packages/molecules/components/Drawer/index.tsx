import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import DrawerComponent from './Drawer';
import DrawerItem from './DrawerItem';
import DrawerItemGroup from './DrawerItemGroup';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';
import { DrawerCollapsible, DrawerCollapsibleItem } from './Collapsible';

const DrawerDefault = Object.assign(DrawerComponent, {
    Item: DrawerItem,
    ItemGroup: DrawerItemGroup,
    Header: DrawerHeader,
    Content: DrawerContent,
    Footer: DrawerFooter,
    Collapsible: DrawerCollapsible,
    CollapsibleItem: DrawerCollapsibleItem,
});

registerMoleculesComponents({
    Drawer: DrawerDefault,
});

export const Drawer = getRegisteredComponentWithFallback('Drawer', DrawerDefault);

export { Props as DrawerProps, drawerStyles } from './Drawer';
export {
    Props as DrawerItemProps,
    DrawerItemElement,
    DrawerItemElementProps,
    drawerItemStyles,
} from './DrawerItem';
export { Props as DrawerItemGroupProps, drawerItemGroupStyles } from './DrawerItemGroup';
export { Props as DrawerContentProps, drawerContentStyles } from './DrawerContent';
export { Props as DrawerHeaderProps, drawerHeaderStyles } from './DrawerHeader';
export { Props as DrawerFooterProps, drawerFooterStyles } from './DrawerFooter';
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
