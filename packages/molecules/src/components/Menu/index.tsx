import { getRegisteredComponentWithFallback, registerMoleculesComponents } from '../../core';
import MenuComponent from './Menu';
import MenuItem from './MenuItem';
import MenuDivider from './MenuDivider';

export const MenuDefault = Object.assign(MenuComponent, {
    Item: MenuItem,
    Divider: MenuDivider,
});

registerMoleculesComponents({
    Menu: MenuDefault,
});

export const Menu = getRegisteredComponentWithFallback('Menu', MenuDefault);

export { Props as MenuProps } from './Menu';
export { Props as MenuItemProps } from './MenuItem';
export { menuStyles, menuItemStyles } from './utils';
