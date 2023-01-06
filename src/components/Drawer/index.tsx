import DrawerComponent from './Drawer';
import DrawerItem from './DrawerItem';
import DrawerHeader from './DrawerHeader';
import DrawerContent from './DrawerContent';
import DrawerFooter from './DrawerFooter';

export const Drawer = Object.assign(DrawerComponent, {
    Item: DrawerItem,
    Header: DrawerHeader,
    Content: DrawerContent,
    Footer: DrawerFooter,
});

export { Props as DrawerProps } from './Drawer';
export { Props as DrawerItemProps, DrawerItemElement, DrawerItemElementProps } from './DrawerItem';
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
