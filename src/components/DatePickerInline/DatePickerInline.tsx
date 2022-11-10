import { memo, useMemo } from 'react';
import { View, ViewStyle } from 'react-native';

import { useComponentStyles, useControlledValue } from '../../hooks';
import type { LocalState } from '../DatePickerModal/types';
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
    const [state, onStateChange] = useControlledValue<LocalState>({
        value: getStateValue({ date, dates, startDate, endDate }, mode),
        onChange: onChange as any,
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
                startDate={state?.startDate}
                endDate={state?.endDate}
                date={state?.date}
                onChange={onStateChange as any}
                dates={state?.dates}
            />
        </View>
    );
};

export const getStateValue = (state: LocalState, mode: DatePickerInlineProps['mode']) => {
    if (mode === 'single') {
        return state.date !== undefined ? state : undefined;
    } else if (mode === 'range') {
        return state.startDate !== undefined || state.endDate !== undefined ? state : undefined;
    } else if (mode === 'multiple') {
        return state.dates !== undefined ? state : undefined;
    }
    return state;
};

export default memo(DatePickerInline);
