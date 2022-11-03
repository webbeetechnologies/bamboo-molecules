import { forwardRef, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useMolecules, useFilePicker } from '../../hooks';
import type { TextInputProps } from '../TextInput';
import type { DocumentResult, DocumentPickerOptions } from './types';

export type OmitProp =
    | 'editable'
    | 'multiline'
    | 'onChangeText'
    | 'keyboardType'
    | 'defaultValue'
    | 'value';

export type Props = Omit<TextInputProps, OmitProp> &
    DocumentPickerOptions & {
        /**
         * Allows multiple files to be selected from the system UI.
         * @default false
         */
        multiple?: boolean;
        /**
         * Displays the Spinner on the right side in place of the default upload icon
         * @default false
         */
        loading?: boolean;
        /**
         * To Control the value
         */
        value?: DocumentResult | DocumentResult[];
        /**
         * The Callback function to return the selected files as an array or object
         */
        onChange?: (result: DocumentResult | DocumentResult[]) => any;
        /**
         * To replace the default progress indicator
         */
        progressIndicator?: ReactNode;
    };

const FilePicker = (
    {
        variant = 'outlined',
        loading,
        right: rightProp,
        progressIndicator,
        type,
        multiple,
        allowMultiSelection,
        transitionStyle,
        mode,
        copyTo,
        presentationStyle,
        value,
        onChange = () => {},
        ...rest
    }: Props,
    ref: any,
) => {
    const { TextInput, IconButton, ActivityIndicator } = useMolecules();
    const [displayText, setDisplayText] = useState('');

    const onTriggerFilePicker = useFilePicker({
        type,
        copyTo,
        mode,
        allowMultiSelection,
        multiple,
        transitionStyle,
        presentationStyle,
    });

    const onSetInputValue = useCallback(
        (response: DocumentResult | DocumentResult[] | undefined) => {
            if (Array.isArray(response)) {
                if (response.length) {
                    setDisplayText(`${response.length} file${response.length > 1 ? 's' : ''}`);
                }
            } else {
                setDisplayText(response?.name || '');
            }
        },
        [],
    );

    const triggerFilePicker = useCallback(async () => {
        const response = await onTriggerFilePicker();

        onSetInputValue(response);

        onChange?.(response);
    }, [onChange, onSetInputValue, onTriggerFilePicker]);

    const rightElement = useMemo(() => {
        if (!loading) {
            return (
                rightProp || (
                    <IconButton
                        type="material-community"
                        name="upload"
                        onPress={triggerFilePicker}
                    />
                )
            );
        } else {
            return progressIndicator || <ActivityIndicator />;
        }
    }, [ActivityIndicator, IconButton, triggerFilePicker, loading, progressIndicator, rightProp]);

    // if the value changes, we only want file name or the length of the array to display the text
    useEffect(() => {
        onSetInputValue(value);
    }, [onSetInputValue, value]);

    return (
        <TextInput
            variant={variant}
            placeholder="Choose file"
            {...rest}
            value={displayText}
            editable={false}
            right={rightElement}
            ref={ref}
        />
    );
};

export default memo(forwardRef(FilePicker));
