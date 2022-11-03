import { useCallback, useMemo, useState } from 'react';
import { DocumentPicker, DocumentPickerOptions, DocumentResult } from '../utils';

const useFilePicker = (options: DocumentPickerOptions) => {
    const [error, setError] = useState(false);

    const onTriggerFilePicker = useCallback(
        async (callback: (response: DocumentResult | DocumentResult[]) => void): Promise<void> => {
            try {
                const response = await DocumentPicker.getDocumentAsync(options);

                callback?.(response);
            } catch (e) {
                console.error(e);
                setError(true);
            }
        },
        [options],
    );

    return useMemo(() => ({ onTriggerFilePicker, error }), [error, onTriggerFilePicker]);
};

export default useFilePicker;
