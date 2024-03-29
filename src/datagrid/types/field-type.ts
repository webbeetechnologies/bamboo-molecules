import type { ComponentType } from 'react';
import type { IconType } from '../../components';

export type RendererType = 'ValueRenderer' | 'EditorRenderer';

export type FieldType<T = unknown, C extends {} = {}> = {
    type: string;
    title: string;
    icon: string;
    iconType?: IconType;
    ValueRenderer: FieldTypeRenderer<T, C>;
    EditorRenderer: FieldTypeRenderer<T, C>;
    readonly?: boolean;
    showEditor?: (arg: { hovered: boolean; focused: boolean; doubleTapped: boolean }) => boolean;
    // fieldEditorRenderer: ReactElement;
    // fieldEditorValidator: ReactElement;
    validator?: (value: any) => any;
    toggleRenderersWithKeyPress?: boolean;
    [key: string]: any;
};

export type FieldTypes = Record<string, FieldType>;

export interface FieldRendererProps<T = unknown> {
    value: T;
    [key: string]: any;
}

export type FieldTypeRenderer<T = unknown, P extends Record<string, any> = {}> = ComponentType<
    P & FieldRendererProps<T>
>;
