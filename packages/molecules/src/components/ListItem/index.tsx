import { getRegisteredMoleculesComponent, registerMoleculesComponents } from '../../core';
import ListItemComponent from './ListItem';
import ListItemTitle from './ListItemTitle';
import ListItemDescription from './ListItemDescription';
const ListItemDefault = Object.assign(ListItemComponent, {
    Title: ListItemTitle,
    Description: ListItemDescription,
});

registerMoleculesComponents({
    ListItem: ListItemDefault,
});

export const ListItem = getRegisteredMoleculesComponent('ListItem');

export { Props as ListItemProps } from './ListItem';
export { listItemStyles, listItemTitleStyles, listItemDescriptionStyles } from './utils';
