import {
    ElementGroup,
    ElementGroupProps,
    Select,
    TextInput,
    IconButton,
} from '../../../src/components';

export type Props = ElementGroupProps & {};

export const Example = (props: Props) => {
    return <ElementGroup {...props} />;
};

export const ExampleNestedElementGroup = (props: Props) => {
    return (
        <ElementGroup {...props}>
            <ElementGroup>
                <Select
                    records={[
                        {
                            data: [
                                {
                                    id: 1,
                                    label: 'contains',
                                },
                                {
                                    id: 2,
                                    label: 'does not contain',
                                },
                                {
                                    id: 3,
                                    label: 'is',
                                },
                                {
                                    id: 4,
                                    label: 'is not',
                                },
                                {
                                    id: 5,
                                    label: 'is empty',
                                },
                                {
                                    id: 6,
                                    label: 'is not empty',
                                },
                            ],
                        },
                    ]}
                    inputProps={{ variant: 'outlined', label: 'Select operator' }}
                />
                <TextInput variant="outlined" label="value" />
            </ElementGroup>
            <IconButton
                name="delete"
                variant="outlined"
                onPress={() => {}}
                style={{ height: '100%', width: 45 }}
            />
            <IconButton
                name="drag"
                variant="outlined"
                onPress={() => {}}
                style={{ height: '100%', width: 45 }}
            />
        </ElementGroup>
    );
};
