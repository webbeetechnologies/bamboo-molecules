import { useCallback, useMemo, useState } from 'react';
import { DocumentPicker, DocumentPickerOptions, DocumentResult } from '../utils';

const useFilePicker = (options: DocumentPickerOptions) => {
    const [error, setError] = useState(false);

    const onTriggerFilePicker = useCallback(
        async (callback: (response: DocumentResult | DocumentResult[]) => void): Promise<void> => {
            try {
                let response;

                if (options.multiple) {
                    response = await DocumentPicker.pickMultiple(options);
                } else {
                    response = await DocumentPicker.pickSingle(options);
                }

                callback?.(response);
            } catch (e) {
                // TODO: Check DocumentPicker cancellation.
                // It might result in an error.
                console.error(e);
                setError(true);
            }
        },
        [options],
    );

    return useMemo(() => ({ onTriggerFilePicker, error }), [error, onTriggerFilePicker]);
};

export default useFilePicker;