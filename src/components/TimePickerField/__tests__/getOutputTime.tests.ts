import { getOutputTime } from '../utils';

describe('getOutputTime. No matter if the format is am/pm or 24 hour, the output should always be in 24 hours format', () => {
    it('should format time in 24 hour format', () => {
        const time = '13';
        const expected = '13:00';
        const is24Hour = true;

        expect(getOutputTime({ time, is24Hour })).toBe(expected);
    });

    it('should format time in 12 hour format', () => {
        const time = '1:3';
        const expected = '01:30';
        const is24Hour = false;

        expect(getOutputTime({ time, is24Hour })).toBe(expected);
    });

    it('should sanitize the time and format', () => {
        const time = '26:30pm';
        const expected = '12:30';
        const is24Hour = false;

        expect(getOutputTime({ time, is24Hour })).toBe(expected);
    });

    it('should convert pm to 24 hour time', () => {
        const time = '05:00pm';
        const expected = '17:00';
        const is24Hour = false;

        expect(getOutputTime({ time, is24Hour })).toBe(expected);
    });
});
