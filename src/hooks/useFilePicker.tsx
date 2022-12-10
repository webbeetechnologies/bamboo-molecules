import { useCallback, useMemo, useState } from 'react';
import { DocumentPicker, DocumentPickerOptions, DocumentResult, isNil, omitBy } from '../utils';

const useFilePicker = ({ multiple, onCancel, ...options }: DocumentPickerOptions) => {
    const [error, setError] = useState(false);

    const onTriggerFilePicker = useCallback(
        async (callback: (response: DocumentResult | DocumentResult[]) => void): Promise<void> => {
            const omittedOptions = omitBy(options, isNil);

            try {
                let response;

                if (multiple) {
                    response = await DocumentPicker.pickMultiple(omittedOptions);
                } else {
                    response = await DocumentPicker.pickSingle(omittedOptions);
                }

                callback?.(response);
            } catch (e) {
                // eslint-disable-next-line no-console
                console.log('FilePicker Error', e, e?.code);

                if (e?.code === 'DOCUMENT_PICKER_CANCELED.') {
                    onCancel?.();
                    return;
                }
                // It might result in an error.
                setError(true);
            }
        },
        [multiple, onCancel, options],
    );

    return useMemo(() => ({ onTriggerFilePicker, error }), [error, onTriggerFilePicker]);
};

export default useFilePicker;
