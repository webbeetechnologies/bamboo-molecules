import { memo, useState, useCallback } from 'react';

import { DatePickerInlineBase, getStateValue } from '../DatePickerInline';
import AnimatedCrossView from './AnimatedCrossView';
import DatePickerModalHeader from './DatePickerModalHeader';
import DatePickerModalContentHeader from './DatePickerModalContentHeader';
import CalendarEdit from './CalendarEdit';
import DatePickerModalHeaderBackground from './DatePickerModalHeaderBackground';

import type {
    DatePickerModalContentSingleProps,
    DatePickerModalContentRangeProps,
    DatePickerModalContentMultiProps,
    LocalState,
} from './types';
import { useControlledValue } from '../../hooks';

type Props =
    | DatePickerModalContentSingleProps
    | DatePickerModalContentRangeProps
    | DatePickerModalContentMultiProps;

export function DatePickerModalContent(props: Props) {
    const {
        mode = 'single',
        onChange,
        onConfirm,
        onDismiss,
        disableSafeTop,
        disableWeekDays,
        locale = 'en',
        validRange,
        dateMode,
        startYear,
        endYear,
        date,
        startDate,
        endDate,
        dates,
    } = props;
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const onInnerChange = useCallback(
        (params: any) => {
            onChange?.(params);
        },
        [onChange],
    );

    const [state, onStateChange] = useControlledValue<LocalState>({
        value: getStateValue(
            {
                date,
                dates,
                startDate,
                endDate,
            },
            mode,
        ),
        onChange: onInnerChange,
    });

    const onInnerConfirm = useCallback(() => {
        if (mode === 'single') {
            (onConfirm as DatePickerModalContentSingleProps['onConfirm'])?.({
                date: state?.date,
            });
        } else if (mode === 'range') {
            (onConfirm as DatePickerModalContentRangeProps['onConfirm'])?.({
                startDate: state?.startDate,
                endDate: state?.endDate,
            });
        } else if (mode === 'multiple') {
            (onConfirm as DatePickerModalContentMultiProps['onConfirm'])?.({
                dates: state?.dates || [],
            });
        }
    }, [state, mode, onConfirm]);

    const onToggleCollapse = useCallback(() => {
        setCollapsed(prev => !prev);
    }, [setCollapsed]);

    return (
        <>
            <DatePickerModalHeaderBackground>
                <DatePickerModalHeader
                    onSave={onInnerConfirm}
                    onDismiss={onDismiss}
                    saveLabel={props.saveLabel}
                    saveLabelDisabled={props.saveLabelDisabled || false}
                    uppercase={props.uppercase || true}
                    disableSafeTop={disableSafeTop}
                    closeIcon={props.closeIcon}
                />
                <DatePickerModalContentHeader
                    state={state || { startDate, dates, date, endDate }}
                    mode={mode}
                    collapsed={collapsed}
                    onToggle={onToggleCollapse}
                    headerSeparator={props.headerSeparator}
                    emptyLabel={props.emptyLabel}
                    label={props.label}
                    moreLabel={props.moreLabel}
                    startLabel={props.startLabel}
                    endLabel={props.endLabel}
                    uppercase={props.uppercase || true}
                    locale={locale}
                    editIcon={props.editIcon}
                    calendarIcon={props.calendarIcon}
                />
            </DatePickerModalHeaderBackground>

            <AnimatedCrossView
                collapsed={collapsed}
                calendar={
                    <DatePickerInlineBase
                        locale={locale}
                        mode={mode}
                        startDate={state?.startDate}
                        endDate={state?.endDate}
                        date={state?.date}
                        onChange={onStateChange as typeof onInnerChange}
                        disableWeekDays={disableWeekDays}
                        dates={state?.dates}
                        validRange={validRange}
                        dateMode={dateMode}
                        startYear={startYear}
                        endYear={endYear}
                    />
                }
                calendarEdit={
                    <CalendarEdit
                        mode={mode}
                        state={state || { startDate, dates, date, endDate }}
                        label={props.label}
                        startLabel={props.startLabel}
                        endLabel={props.endLabel}
                        collapsed={collapsed}
                        onChange={onStateChange}
                        validRange={validRange}
                        locale={locale}
                    />
                }
            />
        </>
    );
}

export default memo(DatePickerModalContent);
