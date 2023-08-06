import { typedMemo } from '@bambooapp/bamboo-molecules';

import { ErrorBoundary } from '../ErrorBoundary';
import { useFieldType } from '../../contexts';
import type { FieldTypeRenderer, RendererType } from '../../types';

type CreateFieldRendererArgs = {
    type: RendererType;
};

export type Props<T, P extends {} = Record<string, any>> = P & {
    value: T;
    type: string;
};

const createFieldRenderer = ({ type }: CreateFieldRendererArgs) => {
    return typedMemo(
        <T extends any = any, P extends {} = Record<string, any>>({
            value,
            type: fieldType,
            ...rest
        }: Props<T, P>) => {
            const CurrentField = useFieldType(fieldType);

            const { readonlyEditRenderer } = useFieldType(fieldType) || {};

            // if the Field doesn't exist useFieldType will throw an error
            if (!CurrentField || !CurrentField[type]) return null;

            const Renderer = CurrentField[type] as FieldTypeRenderer<T>;

            return (
                <ErrorBoundary>
                    <Renderer
                        value={value}
                        disabled={readonlyEditRenderer}
                        readonly={readonlyEditRenderer}
                        {...rest}
                    />
                </ErrorBoundary>
            );
        },
    );
};

export default createFieldRenderer;
