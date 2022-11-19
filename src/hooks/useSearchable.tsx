import type { ReactElement } from 'react';
import type { TextInputProps } from '../components';
import { useMolecules } from './index';
import useControlledValue from './useControlledValue';
import { useCallback, useMemo } from 'react';

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
    const { TextInput, IconButton } = useMolecules();
    const [value, onValueChange] = useControlledValue({
        value: query || '',
        defaultValue: '', // to disable the useControlledValue inside TextInput
        onChange: onQueryChange,
        disabled: !searchable,
    });

    const onPressClear = useCallback(() => {
        onValueChange('');
    }, [onValueChange]);

    return useMemo(
        () =>
            searchable && onQueryChange ? (
                <TextInput
                    right={({ forceFocus }) => (
                        <IconButton
                            name={value ? 'close-circle-outline' : 'magnify'}
                            onPress={value ? onPressClear : forceFocus}
                        />
                    )}
                    {...searchInputProps}
                    value={value}
                    onChangeText={onValueChange}
                />
            ) : null,
        [
            IconButton,
            TextInput,
            onPressClear,
            onQueryChange,
            onValueChange,
            searchInputProps,
            searchable,
            value,
        ],
    );
};

export default useSearchable;
