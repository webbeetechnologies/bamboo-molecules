import React, { memo, useCallback, useMemo } from 'react';

import { useMolecules } from '../../../App';
import type { TriggerProps } from '../../../../src/hocs/withPopper';
import type { ButtonVariant } from '../../../../src/components/Button/Button';
import type { StyleProp, ViewStyle } from 'react-native';

type Data = { text: string | number };

export type Props = {
    label?: string;
    data: Data[];
    onChange: (item: Data) => void;
    variant?: ButtonVariant;
    style?: StyleProp<ViewStyle>;
};

const SelectDropdown = memo((props: Props) => {
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

    const onSelect = useCallback((item: Data) => {
        onChange(item);
    }, []);

    const renderItem = useCallback(
        ({ item }: { item: Data }) => <Item item={item} onPress={onSelect} />,
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

type ItemProps = {
    item: Data;
    onPress: (item: Data) => void;
};

const Item = memo(({ item, onPress }: ItemProps) => {
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
