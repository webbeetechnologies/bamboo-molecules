import { Platform } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import type { DocumentResult } from '../components';

// @needsAudit
export type DocumentPickerOptions = {
    /**
     * The [MIME type(s)](https://en.wikipedia.org/wiki/Media_type) of the documents that are available
     * to be picked. Is also supports wildcards like `'image/*'` to choose any image. To allow any type
     * of document you can use `'&ast;/*'`.
     * @default '&ast;/*'
     */
    type?: string | string[];
    /**
     * If `true`, the picked file is copied to [`FileSystem.CacheDirectory`](./filesystem#filesystemcachedirectory),
     * which allows other Expo APIs to read the file immediately. This may impact performance for
     * large files, so you should consider setting this to `false` if you expect users to pick
     * particularly large files and your app does not need immediate read access.
     * @default true
     */
    copyToCacheDirectory?: boolean;
    /**
     * Allows multiple files to be selected from the system UI.
     * @default false
     * @platform web
     */
    multiple?: boolean;
};

// @needsAudit @docsMissing
// export type DocumentResult =
//     | { type: 'cancel' }
//     | {
//           type: 'success';
//           /**
//            * Document original name.
//            */
//           name: string;
//           /**
//            * Document size in bytes.
//            */
//           size?: number;
//           /**
//            * An URI to the local document file.
//            */
//           uri: string;
//           /**
//            * Document MIME type.
//            */
//           mimeType?: string;
//           /**
//            * Timestamp of last document modification.
//            */
//           lastModified?: number;
//           file?: File;
//           output?: FileList | null;
//       };

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

export default {
    get name(): string {
        return 'DocumentPickerWeb';
    },

    async getDocumentAsync({
        type = '*/*',
        multiple = false,
    }: DocumentPickerOptions): Promise<DocumentResult | DocumentResult[]> {
        // SSR guard
        if (Platform.OS !== 'web') {
            return { type: 'cancel' };
        }

        const input = document.createElement('input');
        input.style.display = 'none';
        input.setAttribute('type', 'file');
        input.setAttribute('accept', Array.isArray(type) ? type.join(',') : type);
        input.setAttribute('id', uuidv4());

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
    },
};
