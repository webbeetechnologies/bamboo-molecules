import { Platform } from 'react-native';
import RNDocumentPicker, {
    DocumentPickerOptions as RNDocumentPickerOptions,
    DocumentPickerResponse,
} from 'react-native-document-picker';
export { types as documentTypes } from 'react-native-document-picker';

type MobilePlatform = 'android' | 'ios';

export type DocumentPickerOptions = RNDocumentPickerOptions<MobilePlatform> & {
    /**
     * Allows multiple files to be selected from the system UI.
     * @default false
     */
    multiple?: boolean;
};

export type DocumentResult = Partial<DocumentPickerResponse> & {
    mimeType?: string;
    file?: File;
    lastModified?: number;
};

const resolveFileData = (file: File): Promise<DocumentResult> => {
    return new Promise((resolve, reject) => {
        const mimeType = file.type;
        const reader = new FileReader();

        reader.onerror = () => {
            reject(new Error(`Failed to read the selected media because the operation failed.`));
        };
        reader.onload = ({ target }) => {
            const uri = (target as any).result;

            resolve({
                type: 'success',
                uri,
                mimeType,
                name: file.name,
                file: file,
                lastModified: file.lastModified,
                size: file.size,
            });
        };
        // Read in the image file as a binary string.
        reader.readAsDataURL(file);
    });
};

const getDocumentAsyncWeb = async ({
    type = '*/*',
    multiple = false,
}: DocumentPickerOptions): Promise<DocumentResult | DocumentResult[]> => {
    // SSR guard
    if (Platform.OS !== 'web') {
        return { type: 'cancel' };
    }

    const input = document.createElement('input');
    input.style.display = 'none';
    input.setAttribute('type', 'file');
    input.setAttribute('accept', Array.isArray(type) ? type.join(',') : type);

    if (multiple) {
        input.setAttribute('multiple', 'multiple');
    }

    document.body.appendChild(input);

    return new Promise(resolve => {
        input.addEventListener('change', () => {
            if (input.files) {
                const response: Promise<DocumentResult>[] = [];

                Array.from(input.files).forEach(file => response.push(resolveFileData(file)));

                return resolve(Promise.all(response));
            } else {
                resolve({ type: 'cancel' });
            }

            document.body.removeChild(input);
        });

        const event = new MouseEvent('click');
        input.dispatchEvent(event);
    });
};

export default {
    get name(): string {
        return 'DocumentPickerWeb';
    },

    getDocumentAsync: (options: DocumentPickerOptions) => {
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
            return getDocumentAsyncWeb({
                type,
                multiple,
            });
        } else {
            // mobile
            if (multiple) {
                return RNDocumentPicker.pickMultiple({
                    type,
                    transitionStyle,
                    allowMultiSelection,
                    presentationStyle,
                    mode,
                    copyTo,
                });
            } else {
                return RNDocumentPicker.pickSingle({
                    type,
                    transitionStyle,
                    allowMultiSelection,
                    presentationStyle,
                    mode,
                    copyTo,
                });
            }
        }
    },
};
