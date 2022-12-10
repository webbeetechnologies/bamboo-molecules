import type {
    DocumentPickerOptions as RNDocumentPickerOptions,
    DocumentPickerResponse,
} from 'react-native-document-picker';

type MobilePlatform = 'android' | 'ios';

export type DocumentPickerOptions = Omit<
    RNDocumentPickerOptions<MobilePlatform>,
    'allowMultiSelection'
> & {
    /**
     * Allows multiple files to be selected from the system UI.
     * @default false
     */
    multiple?: boolean;
    /**
     * runs when the DocumentPicker is cancelled
     */
    onCancel?: () => void;
};

export type DocumentResult = Partial<DocumentPickerResponse> & {
    mimeType?: string;
    file?: File;
    lastModified?: number;
};
