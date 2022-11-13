import { memo } from 'react';
import { View, ViewProps } from 'react-native';
import { DisableWeekDaysType, showWeekDay } from './dateUtils';
import Day, { EmptyDay } from './Day';
import { useComponentStyles } from '../../hooks';

type Props = ViewProps & {
    weekIndex: number;
    generatedDays: {
        beforeWeekDay: boolean;
        afterWeekDay: boolean;
        year: number;
        month: number;
        dayOfMonth: number;
        dayIndex: number;
        mode: 'single' | 'range' | 'multiple';
        selected: boolean;
        inRange: boolean;
        leftCrop: boolean;
        rightCrop: boolean;
        isToday: boolean;
        disabled: boolean;
    }[];
    onPressDate: (date: Date) => any;
    disableWeekDays?: DisableWeekDaysType;
};

const Week = ({
    weekIndex,
    generatedDays,
    onPressDate,
    disableWeekDays,
    style,
    ...rest
}: Props) => {
    const componentStyles = useComponentStyles('DatePicker_Week', style);

    return (
        <View style={componentStyles} {...rest}>
            {generatedDays
                .filter(gd => showWeekDay(gd.dayIndex, disableWeekDays))
                .map(gd => {
                    return (
                        <>
                            {gd.beforeWeekDay || gd.afterWeekDay ? (
                                <EmptyDay key={gd.dayIndex} />
                            ) : (
                                <Day
                                    key={gd.dayIndex + weekIndex}
                                    day={gd.dayOfMonth}
                                    month={gd.month}
                                    year={gd.year}
                                    selected={gd.selected}
                                    inRange={gd.inRange}
                                    leftCrop={gd.leftCrop}
                                    rightCrop={gd.rightCrop}
                                    onPressDate={onPressDate}
                                    isToday={gd.isToday}
                                    disabled={gd.disabled}
                                />
                            )}
                        </>
                    );
                })}
        </View>
    );
};

export default memo(Week);
