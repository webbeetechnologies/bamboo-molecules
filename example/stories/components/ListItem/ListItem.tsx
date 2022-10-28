import { useMolecules, ListItemProps } from 'bamboo-molecules';

export type Props = ListItemProps & {};

export const Example = (props: Props) => {
    const { ListItem } = useMolecules();

    return <ListItem onPress={() => {}} {...props} />;
};
