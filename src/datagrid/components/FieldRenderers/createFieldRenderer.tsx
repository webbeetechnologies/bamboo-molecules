import { useMemo } from 'react';

import { ErrorBoundary } from '../ErrorBoundary';
import { typedMemo } from '../../hocs';
import { noop } from '../../utils';
import { useFieldType } from '../../core/FieldTypesProvider';
import type { FieldTypeRenderer, RendererType } from '../../types';

type CreateFieldRendererArgs = {
    type: RendererType;
};

export type Props<T, C extends Object, P extends {} = Record<string, any>> = P & {
    value: T;
    onChange?: (value: any) => void;
    type: string;
    returnFieldType: string;
    // Sometimes we want to pass the value and config down directly and not through the field, eg. filter renderer
    options: C;
    returnFieldOptions?: C;
};

const DEFAULT_CONFIG = {};

const createFieldRenderer = ({ type }: CreateFieldRendererArgs) => {
    return typedMemo(
        <
            T extends any = any,
            C extends {} = Record<string, any>,
            P extends {} = Record<string, any>,
        >({
            value,
            onChange,
            options,
            returnFieldOptions,
            type: fieldType,
            returnFieldType,
            ...rest
        }: Props<T, C, P>) => {
            const CurrentField = useFieldType(fieldType || returnFieldType);

            const { readonlyEditRenderer } = useFieldType(fieldType) || {};

            const _options = useMemo(
                () => ({
                    ...(returnFieldOptions || (DEFAULT_CONFIG as C)),
                    ...(options || (DEFAULT_CONFIG as C)),
                }),
                [options, returnFieldOptions],
            );

            // if the Field doesn't exist useFieldType will throw an error
            if (!CurrentField || !CurrentField[type]) return null;

            const Renderer = CurrentField[type] as FieldTypeRenderer<T, C>;

            return (
                <ErrorBoundary>
                    <Renderer
                        value={value}
                        config={_options}
                        returnFieldType={returnFieldType}
                        onChange={onChange || noop}
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
