import React, { memo, useCallback, useMemo } from 'react';

import { useMolecules } from '../../../App';
import type { TriggerProps } from '../../../../src/hocs/withPopper';
import type { ButtonVariant } from '../../../../src/components/Button/Button';
import type { StyleProp, ViewStyle } from 'react-native';

export type Props<T> = {
    label?: string;
    data: T[];
    onChange: (item: T) => void;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
};

const SelectDropdown = memo(<T extends {}>(props: Props<T>) => {
    const { label = 'Select Dropdown', data, onChange, variant = 'text', style } = props;

    const { DropdownList, Button, Icon, Text } = useMolecules();

    const records = useMemo(() => {
        return [
            {
                data: data,
            },
        ];
    }, [data]);

    const TriggerComponent = useCallback(
        (
            props:
                | TriggerProps
                | {
                      onPress: () => void;
                  },
        ) => (
            <Button variant={variant} style={style} {...props}>
                <Text>{label}</Text>
                <Icon name="chevron-down" size={25} style={{ marginLeft: 'spacings.1' }} />
            </Button>
        ),
        [label],
    );

    const onSelect = useCallback((item: T) => {
        onChange(item);
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: T }) => <Item item={item} onPress={onSelect} />,
        [],
    );

    return (
        <DropdownList
            TriggerComponent={TriggerComponent}
            records={records}
            renderItem={renderItem}
        />
    );
});

export default SelectDropdown;

type ItemProps<I> = {
    item: I;
    onPress: (item: { item: I }) => void;
};

const Item = memo(<I extends {}>({ item, onPress }: ItemProps<I>) => {
    const { Button } = useMolecules();

    const onSelect = useCallback(() => {
        onPress(item);
    }, [item]);

    return (
        <Button style={{ borderRadius: 0 }} onPress={onSelect} variant="text">
            {item.text}
        </Button>
    );
});
