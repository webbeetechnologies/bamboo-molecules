import { memo } from 'react';
import { StyleSheet } from 'react-native';

import { useMolecules } from '../../hooks';
import type { DatePickerDockedProps } from './types';
import { DatePickerInlineBase } from '../DatePickerInline';

const DatePickerDocked = (props: DatePickerDockedProps) => {
    const { triggerRef, isOpen, onToggle } = props;
    const { Popover } = useMolecules();
    return (
        <Popover
            placement="bottom right"
            contentStyles={styles.popoverContainer}
            triggerRef={triggerRef}
            isOpen={isOpen}
            onClose={onToggle}>
            <DatePickerInlineBase {...props} isDocked onToggle={onToggle} />
        </Popover>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1 },
    popoverContainer: { padding: 'spacings.0' },
});

export default memo(DatePickerDocked);
