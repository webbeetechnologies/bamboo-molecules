import { sanitizeTime } from '../sanitizeTime';

describe('sanitizeTime', () => {
    test('sanitizes 24-hour format correctly', () => {
        expect(sanitizeTime('21:25', true)).toBe('21:25');
        expect(sanitizeTime('21ljlsj:25', true)).toBe('21:25');
        expect(sanitizeTime('2e1:45', true)).toBe('21:45');
        expect(sanitizeTime('2355', true)).toBe('23:55');
        // expect(sanitizeTime('7:3', true)).toBe('07:03');
    });

    test('sanitizes 12-hour am/pm format correctly', () => {
        expect(sanitizeTime('12:00am', false)).toBe('12:00am');
        expect(sanitizeTime('1:30pm', false)).toBe('1:30pm');
        expect(sanitizeTime('11:59PM', false)).toBe('11:59pm');
        expect(sanitizeTime('12:45AM', false)).toBe('12:45am');
        // expect(sanitizeTime('1:3am', false)).toBe('1:03am');
    });

    test('returns empty string for invalid 24-hour format', () => {
        expect(sanitizeTime('25:00', true)).toBe('');
        expect(sanitizeTime('24:60', true)).toBe('');
        expect(sanitizeTime('24:00', true)).toBe('');
        expect(sanitizeTime('24:', true)).toBe('');
    });

    test('returns empty string for invalid 12-hour format', () => {
        expect(sanitizeTime('13:00am', false)).toBe('');
        expect(sanitizeTime('0:30pm', false)).toBe('');
        expect(sanitizeTime('12:60am', false)).toBe('');
        expect(sanitizeTime('12:am', false)).toBe('');
    });

    test('returns empty string for completely invalid input', () => {
        expect(sanitizeTime('abcdef', true)).toBe('');
        expect(sanitizeTime('', true)).toBe('');
        expect(sanitizeTime(':::', true)).toBe('');
        expect(sanitizeTime('abcdef', false)).toBe('');
        expect(sanitizeTime('', false)).toBe('');
        expect(sanitizeTime(':::', false)).toBe('');
    });

    test('converts 24-hour time to 12-hour format correctly', () => {
        expect(sanitizeTime('15:00', false)).toBe('3:00pm');
        expect(sanitizeTime('00:00', false)).toBe('12:00am');
        expect(sanitizeTime('13:30', false)).toBe('1:30pm');
        expect(sanitizeTime('12:45', false)).toBe('12:45pm');
        expect(sanitizeTime('01:03', false)).toBe('1:03am');
    });

    test('converts 12-hour time to 24-hour format correctly', () => {
        expect(sanitizeTime('12:00am', true)).toBe('00:00');
        expect(sanitizeTime('1:30pm', true)).toBe('13:30');
        expect(sanitizeTime('11:59PM', true)).toBe('23:59');
        expect(sanitizeTime('12:45AM', true)).toBe('00:45');
        // expect(sanitizeTime('1:3am', '24-hour')).toBe('01:03');
    });

    test('handles single digit hour correctly', () => {
        expect(sanitizeTime('1', false)).toBe('1:00am');
        expect(sanitizeTime('2', false)).toBe('2:00am');
        expect(sanitizeTime('12', false)).toBe('12:00am');
        expect(sanitizeTime('1', true)).toBe('01:00');
        expect(sanitizeTime('2', true)).toBe('02:00');
        expect(sanitizeTime('23', true)).toBe('23:00');
    });
});
