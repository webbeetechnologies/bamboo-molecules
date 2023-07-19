import MenuComponent from './Menu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';

export const Menu = Object.assign(MenuComponent, {
    Item: MenuItem,
    Divider: MenuDivider,
});

Menu.displayName = 'Menu';

export { Props as MenuProps } from './Menu';
export { Props as MenuItemProps } from './MenuItem';
export { menuStyles, menuItemStyles } from './utils';
