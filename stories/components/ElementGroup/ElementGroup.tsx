import {
    ElementGroup,
    ElementGroupProps,
    Select,
    TextInput,
    IconButton,
    TextInputProps,
} from '../../../src/components';
import { StyleSheet } from 'react-native';
import { useCallback, useMemo } from 'react';

export type Props = ElementGroupProps & {};

export const Example = (props: Props) => {
    return <ElementGroup {...props} />;
};

export const ExampleNestedElementGroup = (props: Props) => {
    const onPressDelete = useCallback(() => {}, []);
    const onPressDrag = useCallback(() => {}, []);

    const inputProps = useMemo(
        () => ({ variant: 'outlined', label: 'Select operator' } as TextInputProps),
        [],
    );

    return (
        <ElementGroup {...props}>
            <ElementGroup>
                <Select records={records} inputProps={inputProps} />
                <TextInput variant="outlined" label="value" />
            </ElementGroup>
            <IconButton
                name="delete"
                variant="outlined"
                onPress={onPressDelete}
                style={styles.iconButton}
            />
            <IconButton
                name="drag"
                variant="outlined"
                onPress={onPressDrag}
                style={styles.iconButton}
            />
        </ElementGroup>
    );
};

const records = [
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
];

const styles = StyleSheet.create({
    iconButton: { height: '100%', width: 45 },
});
