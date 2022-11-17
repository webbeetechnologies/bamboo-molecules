import type { ReactElement } from 'react';
import type { TextInputProps } from '../components';
import { useMolecules } from './index';
import useControlledValue from './useControlledValue';
import { useCallback } from 'react';

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
        value: query,
        defaultValue: '', // to disable the useControlledValue inside TextInput
        onChange: onQueryChange,
        disabled: !searchable,
    });

    const onPressClear = useCallback(() => {
        onValueChange('');
    }, [onValueChange]);

    return searchable ? (
        <TextInput
            right={value && <IconButton name="close-circle-outline" onPress={onPressClear} />}
            {...searchInputProps}
            value={value}
            onChangeText={onValueChange}
        />
    ) : null;
};

export default useSearchable;
