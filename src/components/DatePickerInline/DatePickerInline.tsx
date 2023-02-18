import { memo, useCallback, useMemo } from 'react';
import type { ViewStyle } from 'react-native';

import { useComponentStyles, useControlledValue, useMolecules } from '../../hooks';
import type {
    LocalState,
    LocalStateMultiple,
    LocalStateRange,
    LocalStateSingle,
} from '../DatePickerModal/types';
import DatePickerInlineBase from './DatePickerInlineBase';
import type { DatePickerInlineBaseProps } from './types';

export type DatePickerInlineProps = DatePickerInlineBaseProps & {
    containerStyle?: ViewStyle;
};

const DatePickerInline = ({
    date,
    startDate,
    endDate,
    dates,
    onChange,
    locale = 'en',
    mode = 'single',
    containerStyle: containerStyleProp,
    ...rest
}: DatePickerInlineProps) => {
    const { View } = useMolecules();

    const onInnerChange = useCallback(
        (params: any) => {
            onChange?.(params);
        },
        [onChange],
    );

    const [state, onStateChange] = useControlledValue<LocalState>({
        value: getStateValue({ date, dates, startDate, endDate }, mode),
        onChange: onInnerChange,
    });

    const componentStyles = useComponentStyles('DatePickerInline', containerStyleProp);

    const { containerStyle } = useMemo(() => {
        const { container, ...restStyle } = componentStyles;

        return {
            containerStyle: [container, restStyle],
        };
    }, [componentStyles]);

    return (
        <View style={containerStyle}>
            <DatePickerInlineBase
                {...rest}
                locale={locale}
                mode={mode}
                startDate={(state as LocalStateRange)?.startDate}
                endDate={(state as LocalStateRange)?.endDate}
                date={(state as LocalStateSingle)?.date}
                onChange={onStateChange as typeof onInnerChange}
                dates={(state as LocalStateMultiple)?.dates}
            />
        </View>
    );
};

export const getStateValue = (state: LocalState, mode: DatePickerInlineProps['mode']) => {
    if (mode === 'single') {
        return (state as LocalStateSingle).date !== undefined ? state : undefined;
    } else if (mode === 'range') {
        return (state as LocalStateRange).startDate !== undefined ||
            (state as LocalStateRange).endDate !== undefined
            ? state
            : undefined;
    } else if (mode === 'multiple') {
        return (state as LocalStateMultiple).dates !== undefined ? state : undefined;
    }
    return state;
};

export default memo(DatePickerInline);
