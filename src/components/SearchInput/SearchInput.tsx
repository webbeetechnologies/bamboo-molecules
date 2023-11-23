import { memo, useCallback } from 'react';
import { useMolecules } from '../../hooks';
import type { TextInputElementProps, TextInputProps } from '../TextInput';

export const SearchInput = memo(({ value, onChangeText, ...rest }: TextInputProps) => {
    const { TextInput, IconButton } = useMolecules();

    const onPressClear = useCallback(() => {
        onChangeText?.('');
    }, [onChangeText]);

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
        <TextInput right={right} autoFocus {...rest} value={value} onChangeText={onChangeText} />
    );
});
