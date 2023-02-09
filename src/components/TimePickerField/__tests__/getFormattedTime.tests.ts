import { getFormattedTime } from '../utils';

describe('formatTime. Should normalize any input value into the correctly formatted time string', () => {
    it('should format time in 24 hour format', () => {
        const time = '1';
        const expected = '01:00';
        const is24Hour = true;

        expect(getFormattedTime({ time, is24Hour })).toBe(expected);
    });
    it('should format time in 12 hour format', () => {
        const time = '1:3';
        const expected = '01:03am';
        const is24Hour = false;

        expect(getFormattedTime({ time, is24Hour })).toBe(expected);
    });

    it('should sanitize the time and format into 12 hours format', () => {
        const time = '14:30:20222asasf';
        const expected = '02:30pm';
        const is24Hour = false;

        expect(getFormattedTime({ time, is24Hour })).toBe(expected);
    });

    it('should give us correct time string even if the input time string is over 24 hours', () => {
        const time = '24:61';
        const expected = '01:01am';
        const is24Hour = false;

        expect(getFormattedTime({ time, is24Hour })).toBe(expected);
    });
});
