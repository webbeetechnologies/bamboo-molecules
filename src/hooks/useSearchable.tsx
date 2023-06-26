import { memo, useCallback, useMemo, ReactElement } from 'react';

import type { TextInputProps, TextInputElementProps } from '../components';
import useMolecules from './useMolecules';
import useControlledValue from './useControlledValue';

export interface UseSearchableProps {
    searchable?: boolean;
    onQueryChange?: (search: string) => void;
    query?: string;
    searchInputProps?: Omit<TextInputProps, 'value' | 'onChangeText'>;
}

const useSearchable = ({
    searchable,
    onQueryChange,
    query,
    searchInputProps,
}: UseSearchableProps = {}): ReactElement<TextInputProps> | null => {
    const [value, onValueChange] = useControlledValue({
        value: query || '',
        defaultValue: '', // to disable the useControlledValue inside TextInput
        onChange: onQueryChange,
        disabled: !searchable,
    });

    const onPressClear = useCallback(() => {
        onValueChange('');
    }, [onValueChange]);

    return useMemo(() => {
        if (!searchable || !onQueryChange) return null;

        return (
            <SearchInput
                onPressClear={onPressClear}
                {...searchInputProps}
                value={value}
                onChangeText={onValueChange}
            />
        );
    }, [onPressClear, onQueryChange, onValueChange, searchInputProps, searchable, value]);
};

const SearchInput = memo(
    ({
        value,
        onChangeText,
        onPressClear,
        ...rest
    }: TextInputProps & { onPressClear: () => void }) => {
        const { TextInput, IconButton } = useMolecules();

        const right = useCallback(
            ({ color, forceFocus }: TextInputElementProps) => (
                <IconButton
                    name={value ? 'close-circle-outline' : 'magnify'}
                    onPress={value ? onPressClear : forceFocus}
                    color={color}
                />
            ),
            [IconButton, onPressClear, value],
        );

        return (
            <TextInput
                right={right}
                autoFocus
                {...rest}
                value={value}
                onChangeText={onChangeText}
            />
        );
    },
);

export default useSearchable;
