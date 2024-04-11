import { useCallback, useMemo, ReactElement } from 'react';

import type { TextInputProps, TextInputElementProps } from '../components';
import useMolecules from './useMolecules';
import useControlledValue from './useControlledValue';

export interface UseSearchableProps {
    searchable?: boolean;
    onQueryChange?: (search: string) => void;
    query?: string;
    searchInputProps?: Omit<TextInputProps, 'value' | 'onChangeText'>;
}

const useSearchInputProps = (props?: Partial<TextInputProps>) => {
    const { IconButton } = useMolecules();

    const onChange = props?.onChangeText;
    const onPressClear = useCallback(() => {
        onChange?.('');
    }, [onChange]);

    const right = useCallback(
        ({ color, forceFocus }: TextInputElementProps) => (
            <IconButton
                name={props?.value ? 'close-circle-outline' : 'magnify'}
                onPress={props?.value ? onPressClear : forceFocus}
                color={color}
            />
        ),
        [IconButton, onPressClear, props?.value],
    );

    return useMemo(
        () => (props?.right === undefined ? props : { right, ...props }),
        [props, right],
    );
};

const useSearchable = ({
    searchable,
    onQueryChange,
    query,
    searchInputProps,
}: UseSearchableProps = {}): ReactElement<TextInputProps> | null => {
    const { TextInput } = useMolecules();

    const [value, onValueChange] = useControlledValue({
        value: query || '',
        defaultValue: '', // to disable the useControlledValue inside TextInput
        onChange: onQueryChange,
        disabled: !searchable,
    });

    const props = useSearchInputProps(
        useMemo(
            () => ({
                ...searchInputProps,
                value,
                onChangeText: onValueChange,
            }),
            [onValueChange, searchInputProps, value],
        ),
    );

    return useMemo(() => {
        if (!searchable || !onQueryChange) return null;

        return <TextInput {...props} />;
    }, [TextInput, onQueryChange, props, searchable]);
};

export { useSearchInputProps };

export default useSearchable;
