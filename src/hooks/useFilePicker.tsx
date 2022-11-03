import { useCallback } from 'react';
import { Platform } from 'react-native';
import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import { DocumentPickerWeb } from '../utils';

type MobilePlatform = 'android' | 'ios';

type Options = DocumentPickerOptions<MobilePlatform> & {
    /**
     * Allows multiple files to be selected from the system UI.
     * @default false
     */
    multiple?: boolean;
};

const useFilePicker = (options: Options) => {
    return useCallback(async () => {
        const {
            type = ['*/*'],
            multiple = false,
            mode = 'import',
            transitionStyle = 'coverVertical',
            copyTo = 'cachesDirectory',
            allowMultiSelection = false,
            presentationStyle = 'pageSheet',
        } = options;

        if (Platform.OS === 'web') {
            return await DocumentPickerWeb.getDocumentAsync({
                type,
                multiple,
            });
        } else {
            // mobile
            if (multiple) {
                return await DocumentPicker.pickMultiple({
                    type,
                    transitionStyle,
                    allowMultiSelection,
                    presentationStyle,
                    mode,
                    copyTo,
                });
            } else {
                return await DocumentPicker.pickSingle({
                    type,
                    transitionStyle,
                    allowMultiSelection,
                    presentationStyle,
                    mode,
                    copyTo,
                });
            }
        }
    }, [options]);
};

export default useFilePicker;
