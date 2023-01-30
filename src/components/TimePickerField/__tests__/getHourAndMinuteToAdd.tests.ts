import { getAddableHourAndMinute } from '../utils';

describe('getAddableHourAndMinute', () => {
    it('should return the same hour and minute for the 24 hour time', () => {
        const time = '12:30';
        const is24Hour = true;
        const expected = {
            hour: 12,
            minute: 30,
        };

        expect(getAddableHourAndMinute({ time, is24Hour })).toEqual(expected);
    });

    it('should return hour = 12 and minute for 12:30pm time string in 12 hour format', () => {
        const time = '12:30pm';
        const is24Hour = false;
        const expected = {
            hour: 12,
            minute: 30,
        };

        expect(getAddableHourAndMinute({ time, is24Hour })).toEqual(expected);
    });

    it('should return hour = 0 and minute for 12:30am in 12 hour format', () => {
        const time = '12:30am';
        const is24Hour = false;
        const expected = {
            hour: 0,
            minute: 30,
        };

        expect(getAddableHourAndMinute({ time, is24Hour })).toEqual(expected);
    });

    it('should return hour = 23 and minute for 11:00pm time in 12 Hour format', () => {
        const time = '11:00pm';
        const is24Hour = false;
        const expected = {
            hour: 23,
            minute: 0,
        };

        expect(getAddableHourAndMinute({ time, is24Hour })).toEqual(expected);
    });

    it('should return hour = 0 and minute = 30 for incomplete 12:3 time string for 12 hour format', () => {
        const time = '12:3';
        const is24Hour = false;
        const expected = {
            hour: 0,
            minute: 30,
        };

        expect(getAddableHourAndMinute({ time, is24Hour })).toEqual(expected);
    });

    it('should return hour = 12 and minute = 30 for incomplete 12:3 time string for 24 hour format', () => {
        const time = '12:3';
        const is24Hour = true;
        const expected = {
            hour: 12,
            minute: 30,
        };

        expect(getAddableHourAndMinute({ time, is24Hour })).toEqual(expected);
    });
});
