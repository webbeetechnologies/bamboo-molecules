import type {
    DocumentPickerResponse,
    DocumentPickerOptions as DefaultDocumentPickerOptions,
} from 'react-native-document-picker';

export type DocumentResult = Partial<DocumentPickerResponse> & {
    mimeType?: string;
    file?: File;
    lastModified?: number;
};

export type DocumentPickerOptions = DefaultDocumentPickerOptions<'android' | 'ios'>;
