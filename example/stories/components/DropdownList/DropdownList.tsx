import { useCallback, useRef, useState } from 'react';
import { useMolecules, DropdownListProps, useToggle } from 'bamboo-molecules';
import { generateSectionListData } from '../../common';

// @ts-ignore
export type Props = DropdownListProps & {};

export const Example = (props: Props) => {
    const { DropdownList } = useMolecules();

    return <DropdownList {...props} />;
};

export const ExampleWithToggle = (props: Props) => {
    const { DropdownList, Button } = useMolecules();
    const triggerRef = useRef(null);
    const { state: isOpen, onToggle, setState: setIsOpen } = useToggle();
    const [query, onQueryChange] = useState('');
    const sectionListData = useRef(generateSectionListData(10, 100)).current;
    const [records, setRecords] = useState(sectionListData);

    const onSearch = useCallback(
        (newQuery: string) => {
            onQueryChange(newQuery);

            setRecords(
                sectionListData
                    .map(section => ({
                        ...section,
                        data: section.data.filter(item => item.title.includes(newQuery)),
                    }))
                    .filter(section => section.data.length > 0),
            );
        },
        [sectionListData],
    );

    return (
        <>
            <Button ref={triggerRef} onPress={onToggle}>
                Toggle DropdownList
            </Button>
            <DropdownList
                {...props}
                records={records as any}
                searchable
                query={query}
                onQueryChange={onSearch}
                triggerRef={triggerRef}
                isOpen={isOpen}
                searchInputProps={{
                    label: 'Search',
                }}
                setIsOpen={setIsOpen}
            />
        </>
    );
};
