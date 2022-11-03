import { ComponentType, forwardRef, useCallback } from 'react';
import { Platform } from 'react-native';
import DocumentPicker, { DocumentPickerOptions } from 'react-native-document-picker';
import { DocumentPickerWeb } from '../utils';

type MobilePlatform = 'android' | 'ios';

export type WithFilePickerProps = DocumentPickerOptions<MobilePlatform> & {
    /**
     *  Whether selecting multiple files is allowed. For pick, this is false by default.
     *  allowMultiSelection is false for pickSingle and true for pickMultiple and cannot be overridden for those calls.
     *
     *  allowMultiSelection?:boolean
     */
    /**
     *  The type or types of documents to allow selection of. May be an array of types as single type string.
     *  On Android these are MIME types such as text/plain or partial MIME types such as image/*. See common MIME types.
     *  On iOS these must be Apple "Uniform Type Identifiers"
     *  If type is omitted it will be treated as or public.item.
     *
     *  type?: string|Array<string>
     */
    /**
     *  Controls how the picker is presented, eg. on an iPad you may want to present it fullscreen. Defaults to pageSheet.
     *
     *  [iOS only] presentationStyle:'fullScreen' | 'pageSheet' | 'formSheet' | 'overFullScreen'
     */
    /**
     *  Configure the transition style of the picker. Defaults to coverVertical, when the picker is presented,
     *  its view slides up from the bottom of the screen.
     *
     *  [iOS only] transitionStyle:'coverVertical' | 'flipHorizontal' | 'crossDissolve' | 'partialCurl'
     */
    /**
     *  Defaults to import. If mode is set to import the document picker imports the file from outside to inside the sandbox,
     *  otherwise if mode is set to open the document picker opens the file right in place.
     *
     *  [iOS only] mode:"import" | "open"
     */
    /**
     * If specified, the picked file is copied to NSCachesDirectory / NSDocumentDirectory (iOS) or getCacheDir / getFilesDir (Android).
     * The uri of the copy will be available in result's fileCopyUri.
     * If copying the file fails (eg. due to lack of free space), fileCopyUri will be null,
     * and more details about the error will be available in copyError field in the result.
     * This should help if you need to work with the file(s) later on, because by default, the picked documents are temporary files.
     * They remain available only until your application terminates. This may impact performance for large files,
     * so keep this in mind if you expect users to pick particularly large files and your app does not need immediate read access.
     * On Android, this can be used to obtain local, on-device copy of the file
     * (e.g. if user picks a document from google drive, this will download it locally to the phone
     *
     * [iOS and Android only] copyTo:"cachesDirectory" | "documentDirectory"
     */

    /**
     * Allows multiple files to be selected from the system UI.
     * @default false
     */
    multiple?: boolean;
    /**
     * The function withFilePicker passes to trigger the file picker
     */
    onTriggerFilePicker?: () => void;
};

// P is for type-assertion of the wrapped component props
const withFilePicker = <P extends WithFilePickerProps>(Component: ComponentType<P>) =>
    forwardRef((props: P, ref: any) => {
        const {
            type = ['*/*'],
            multiple = false,
            mode = 'import',
            transitionStyle = 'coverVertical',
            copyTo = 'cachesDirectory',
            allowMultiSelection = false,
            presentationStyle = 'pageSheet',
        } = props;

        const onTriggerFilePicker = useCallback(async () => {
            const options = {
                type,
                allowMultiSelection,
                mode,
                transitionStyle,
                copyTo,
                presentationStyle,
            };

            if (Platform.OS === 'web') {
                return await DocumentPickerWeb.getDocumentAsync({
                    type: options.type,
                    multiple: multiple,
                });
            } else {
                if (multiple) {
                    return await DocumentPicker.pickMultiple(options);
                } else {
                    return await DocumentPicker.pickSingle(options);
                }
            }
        }, [allowMultiSelection, copyTo, mode, multiple, presentationStyle, transitionStyle, type]);

        return <Component {...props} onTriggerFilePicker={onTriggerFilePicker} ref={ref} />;
    });

export default withFilePicker;
