import type { TextProps } from 'react-native';
import { useMolecules, ListItemProps } from 'bamboo-molecules';

export type Props = ListItemProps & {};

export const Example = (props: Props) => {
    const { ListItem } = useMolecules();

    return <ListItem {...props} />;
};

export const ListItemTitle = (props: TextProps) => {
    const { ListItem } = useMolecules();

    return <ListItem.Title {...props} />;
};

export const ListItemDescription = (props: TextProps) => {
    const { ListItem } = useMolecules();

    return <ListItem.Description {...props} />;
};
