import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
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

export const Drawer = getRegisteredMoleculesComponent('Drawer') ?? DrawerDefault;

export { Props as DrawerProps } from './Drawer';
export { Props as DrawerItemProps, DrawerItemElement, DrawerItemElementProps } from './DrawerItem';
export { Props as DrawerItemGroupProps } from './DrawerItemGroup';
export { Props as DrawerContentProps } from './DrawerContent';
export { Props as DrawerHeaderProps } from './DrawerHeader';
export { Props as DrawerFooterProps } from './DrawerFooter';
export {
    drawerStyles,
    drawerItemStyles,
    drawerContentStyles,
    drawerHeaderStyles,
    drawerFooterStyles,
    drawerItemGroupStyles,
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
