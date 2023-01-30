import { formatTime } from '../utils';

const mockDate = new Date('2022-01-01T00:00:00.000Z');

describe('formatTime', () => {
    it('should format time in 24 hour format', () => {
        const hour = '12';
        const minute = '30';
        const is24Hour = true;
        const expected = '12:30';

        expect(formatTime({ date: mockDate, hour, minute, is24Hour })).toBe(expected);
    });

    it('should format time in 12 hour format with AM', () => {
        const hour = '00';
        const minute = '30';
        const is24Hour = false;
        const expected = '12:30am';

        expect(formatTime({ date: mockDate, hour, minute, is24Hour })).toBe(expected);
    });

    it('should format time in 12 hour format with PM', () => {
        const hour = '13';
        const minute = '30';
        const is24Hour = false;
        const expected = '01:30pm';

        expect(formatTime({ date: mockDate, hour, minute, is24Hour })).toBe(expected);
    });

    it('should format time with 0 minute in 24 hour format', () => {
        const hour = '12';
        const minute = '0';
        const is24Hour = true;
        const expected = '12:00';

        expect(formatTime({ date: mockDate, hour, minute, is24Hour })).toBe(expected);
    });

    it('should format time with 0 minute in 12 hour format with PM', () => {
        const hour = '12';
        const minute = '0';
        const is24Hour = false;
        const expected = '12:00pm';

        expect(formatTime({ date: mockDate, hour, minute, is24Hour })).toBe(expected);
    });

    it('should use current date if no date is provided', () => {
        const hour = '12';
        const minute = '30';
        const is24Hour = true;
        const expected = '12:30';

        expect(formatTime({ date: null, hour, minute, is24Hour })).toContain(expected);
    });
});
