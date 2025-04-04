import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import type { DatePickerDockedProps } from './types';
import { DatePickerInlineBase } from '../DatePickerInline';
import DatePickerDockedHeader from './DatePickerDockedHeader';
import { datePickerDockedMonthStyles } from './utils';
import { Popover } from '../Popover';

const DatePickerDocked = (props: DatePickerDockedProps) => {
    const { triggerRef, isOpen, onToggle } = props;

    const { backDropStyle } = useMemo(() => {
        const { backDropStyle: _backDropStyle } = datePickerDockedMonthStyles;

        return {
            backDropStyle: _backDropStyle,
        };
    }, []);

    return (
        <Popover
            placement="bottom right"
            backdropStyles={backDropStyle}
            contentStyles={styles.popoverContainer}
            triggerRef={triggerRef}
            isOpen={isOpen}
            onClose={onToggle}
            popoverContentProps={props.popoverContentProps}>
            <DatePickerInlineBase
                {...props}
                // TODO - fix ts issues
                // @ts-ignore
                HeaderComponent={DatePickerDockedHeader}
                onToggle={onToggle}
                monthStyle={datePickerDockedMonthStyles}
            />
        </Popover>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    popoverContainer: { padding: 0 },
});

export default memo(DatePickerDocked);
