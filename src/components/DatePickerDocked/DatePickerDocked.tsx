import { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { useComponentStyles, useMolecules } from '../../hooks';
import type { DatePickerDockedProps } from './types';
import { DatePickerInlineBase } from '../DatePickerInline';
import DatePickerDockedHeader from './DatePickerDockedHeader';

const DatePickerDocked = (props: DatePickerDockedProps) => {
    const { triggerRef, isOpen, onToggle } = props;
    const dockedMonthStyles = useComponentStyles('DatePickerDocked_Month');
    const { Popover } = useMolecules();

    const { backDropStyle } = useMemo(() => {
        const { backDropStyle: _backDropStyle } = dockedMonthStyles;

        return {
            backDropStyle: _backDropStyle,
        };
    }, [dockedMonthStyles]);

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
                HeaderComponent={DatePickerDockedHeader}
                onToggle={onToggle}
                monthStyle={dockedMonthStyles}
            />
        </Popover>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    popoverContainer: { padding: 'spacings.0' },
});

export default memo(DatePickerDocked);
