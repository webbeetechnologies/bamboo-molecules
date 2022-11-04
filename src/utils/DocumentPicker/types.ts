import type {
    DocumentPickerOptions as RNDocumentPickerOptions,
    DocumentPickerResponse,
} from 'react-native-document-picker';

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
