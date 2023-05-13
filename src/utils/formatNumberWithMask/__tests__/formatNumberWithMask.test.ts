import { formatNumberWithMask } from '../formatNumberWithMask';

describe('normalizeToNumberString', () => {
    it('should work if the input is empty string', () => {
        const normalizedNumberString = formatNumberWithMask({ number: null, separator: '.' });

        expect(normalizedNumberString).toBe('');
    });

    it('should give correctly formatted number with currency symbol prefix and delimiter', () => {
        const normalizedNumberString = formatNumberWithMask({
            number: '12455635',
            separator: '.',
            delimiter: ',',
            prefix: '$',
        });

        expect(normalizedNumberString).toBe('$12,455,635');
    });

    it('should give correctly formatted number with suffix and precision', () => {
        const normalizedNumberString = formatNumberWithMask({
            number: '56.12524',
            separator: '.',
            precision: 2,
            suffix: '%',
        });

        expect(normalizedNumberString).toBe('56.12%');
    });

    it('should correctly apply different separator without losing decimal place', () => {
        const normalizedNumberString = formatNumberWithMask({
            number: '2322.22',
            separator: ',',
            delimiter: '.',
            precision: 2,
        });

        expect(normalizedNumberString).toBe('2.322,22');
    });
});
