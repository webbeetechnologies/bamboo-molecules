import ListItemComponent from './ListItem';
import ListItemTitle from './ListItemTitle';
import ListItemDescription from './ListItemDescription';

const ListItem = Object.assign(ListItemComponent, {
    Title: ListItemTitle,
    Description: ListItemDescription,
});

export default ListItem;

export { listItemStyles, listItemTitleStyles, listItemDescriptionStyles } from './utils';
export { Props as ListItemProps } from './ListItem';
