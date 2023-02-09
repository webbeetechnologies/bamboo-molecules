import type { TextProps } from 'react-native';
import { ListItem, ListItemProps } from '../../../src/components';

export type Props = ListItemProps & {};

export const Example = (props: Props) => {
    return <ListItem {...props} />;
};

export const ListItemTitle = (props: TextProps) => {
    return <ListItem.Title {...props} />;
};

export const ListItemDescription = (props: TextProps) => {
    return <ListItem.Description {...props} />;
};
