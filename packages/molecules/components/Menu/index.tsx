import { getRegisteredComponentWithFallback } from '../../core';
import { List } from '../List';
import MenuComponent, { MenuItem, MenuPopover, MenuRoot, MenuTrigger } from './Menu';
import { MenuRootContext } from './utils';

// Statics go on the wrapper, not the default component — see getRegisteredComponentWithFallback.
export const Menu = Object.assign(getRegisteredComponentWithFallback('Menu', MenuComponent), {
    Root: MenuRoot,
    Trigger: MenuTrigger,
    Item: MenuItem,
    Content: List.Content,
    RootContext: MenuRootContext,
    Popover: MenuPopover,
});

export type { MenuItemProps, Props as MenuProps, MenuRootProps, MenuTriggerProps } from './Menu';
export { MenuRootContext, menuStyles } from './utils';
