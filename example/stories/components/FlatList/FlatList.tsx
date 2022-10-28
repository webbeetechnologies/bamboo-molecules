import { useMolecules, FlatListProps } from 'bamboo-molecules';

export type Props = FlatListProps & {};

export const Example = (props: Props) => {
    const { FlatList } = useMolecules();
    const data = [
        { title: 'First item title', description: 'First item description' },
        { title: 'Second item title', description: 'Second item description' },
    ];
    const renderItem = ({ item }: any) => <h1>{item.title}</h1>;
    return <FlatList {...props} data={data} renderItem={renderItem} />;
};
