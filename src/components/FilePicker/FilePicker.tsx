import { forwardRef, memo, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useMolecules, useFilePicker } from '../../hooks';
import type { TextInputProps } from '../TextInput';
import type { DocumentResult, DocumentPickerOptions } from '../../utils';

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

    const { onTriggerFilePicker, error } = useFilePicker({
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
                if (response.length > 1) {
                    setDisplayText(`${response.length} file${response.length > 1 ? 's' : ''}`);
                    return;
                }

                setDisplayText(response[0].name || '');
                return;
            }

            setDisplayText(response?.name || '');
        },
        [],
    );

    const onPress = useCallback(() => {
        onTriggerFilePicker(response => {
            onSetInputValue(response);

            onChange?.(response);
        });
    }, [onChange, onSetInputValue, onTriggerFilePicker]);

    const rightElement = useMemo(() => {
        if (!loading) {
            return (
                rightProp || (
                    <IconButton type="material-community" name="upload" onPress={onPress} />
                )
            );
        } else {
            return progressIndicator || <ActivityIndicator />;
        }
    }, [ActivityIndicator, IconButton, loading, onPress, progressIndicator, rightProp]);

    // if the value changes, we only want file name or the length of the array to display the text
    useEffect(() => {
        onSetInputValue(value);
    }, [onSetInputValue, value]);

    return (
        <TextInput
            label="Choose file"
            error={error}
            {...rest}
            value={displayText}
            editable={false}
            right={rightElement}
            ref={ref}
        />
    );
};

export default memo(forwardRef(FilePicker));
