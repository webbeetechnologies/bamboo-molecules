import type { ComponentType } from 'react';
import type { IconType } from '@bambooapp/bamboo-molecules';

export type RendererType = 'ViewRenderer' | 'EditRenderer';

export type FieldType<T = unknown, C extends {} = {}> = {
    type: string;
    title: string;
    icon: {
        name: string;
        type?: IconType;
    };
    ValueRenderer: FieldTypeRenderer<T, C>;
    EditorRenderer: FieldTypeRenderer<T, C>;
    readonlyEditorRenderer?: boolean;
    // fieldEditorRenderer: ReactElement;
    // fieldEditorValidator: ReactElement;
    validator?: (value: any) => any;
    [key: string]: any;
};

export type FieldTypes = Record<string, FieldType>;

export interface FieldRendererProps<T = unknown, C extends {} = Record<string, any>> {
    value: T;
    onChange: (value: T) => void;
    config: C;
}

export type FieldTypeRenderer<
    T = unknown,
    C extends {} = {},
    P extends Record<string, any> = {},
> = ComponentType<P & FieldRendererProps<T, C>>;
