import type { ViewStyle } from 'react-native';
import type { Mask } from 'react-native-mask-input';
import { format, set } from 'date-fns';
import type { ComponentStylePropWithVariants } from '../../types';

export const timepickerFieldStyles: ComponentStylePropWithVariants<ViewStyle> = {};

export const getAddableHourAndMinute = ({
    time,
    is24Hour,
}: {
    time: string;
    is24Hour: boolean;
}) => {
    const [hour = '0', minute = '0'] = time.replace(/[ap]m/, '').split(':');

    const hourAndMinute = {
        hour: +hour,
        minute: +minute.toString().padEnd(2, '0'),
    };

    if (is24Hour) {
        return hourAndMinute;
    }

    const isPM = time.replace(/[\d:]/g, '') === 'pm';

    if (isPM) {
        hourAndMinute.hour = +hour >= 12 ? 12 : +hour + 12;
    } else {
        // for AM
        hourAndMinute.hour = +hour >= 12 ? 0 : +hour;
    }

    return hourAndMinute;
};

export const timeMask24Hour: Mask = (text: string = '') => {
    const cleanTime = text.replace(/\D+/g, '');

    const hourFirstDigit = /[012]/; // only 0,1 or 2
    let hourSecondDigit = /\d/; // any number

    if (cleanTime.charAt(0) === '2') {
        hourSecondDigit = /[0123]/; // only 0,1,2 or 3
    }

    const minuteFirstDigit = /[012345]/; // only 0,1,2,3,4 or 5
    const minuteSecondDigit = /\d/; // any number

    return [hourFirstDigit, hourSecondDigit, ':', minuteFirstDigit, minuteSecondDigit];
};

export const timeMask12Hour: Mask = (text: string = '') => {
    const cleanTime = text.replace(/\D+/g, '');

    const hourFirstDigit = /[01]/; // only 0,1 or 2
    let hourSecondDigit = /\d/; // any number

    if (cleanTime.charAt(0) === '1') {
        hourSecondDigit = /[012]/; // only 0,1,2 or 3
    }

    const minuteFirstDigit = /[012345]/; // only 0,1,2,3,4 or 5
    const minuteSecondDigit = /\d/; // any number

    return [hourFirstDigit, hourSecondDigit, ':', minuteFirstDigit, minuteSecondDigit, /[ap]/, 'm'];
};

export const timeFormat = {
    '24': {
        format: 'hh:mm',
        mask: timeMask24Hour,
    },
    '12': {
        format: 'hh:mmaaa',
        mask: timeMask12Hour,
    },
};

export const formatTime = ({
    date,
    hour,
    minute,
    is24Hour,
}: {
    date: Date | null;
    hour: string | number;
    minute: string | number;
    is24Hour: boolean;
}) => {
    return format(
        set(date || new Date(), { hours: +hour, minutes: +minute }),
        is24Hour ? 'HH:mm' : 'hh:mmaaa',
    );
};
