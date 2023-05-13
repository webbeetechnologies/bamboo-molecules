import { normalizeToNumberString } from '../normalizeToNumberString';

describe('normalizeToNumberString', () => {
    it('should work if the input is empty string', () => {
        const normalizedNumberString = normalizeToNumberString({ text: '', separator: '.' });

        expect(normalizedNumberString).toBe('');
    });

    it('should give a correct output if the input string contains characters', () => {
        const normalizedNumberString = normalizeToNumberString({
            text: 'test22.22',
            separator: '.',
        });

        expect(normalizedNumberString).toBe('22.22');
    });

    it('should give a correct output if the input string contains characters and trailing dots', () => {
        const normalizedNumberString = normalizeToNumberString({
            text: 'test22.22....',
            separator: '.',
        });

        expect(normalizedNumberString).toBe('22.22');
    });

    it('should disregard subsequent dots if it contains leading dots', () => {
        const normalizedNumberString = normalizeToNumberString({
            text: '.22.22',
            separator: '.',
        });

        expect(normalizedNumberString).toBe('0.22');
    });

    it('should still work if the separator is anything other than dot', () => {
        const normalizedNumberString = normalizeToNumberString({
            text: 'test,22.22,,,asa.222',
            separator: ',',
        });

        expect(normalizedNumberString).toBe('0.22');
    });

    it('should work with minus sign', () => {
        const normalizedNumberString = normalizeToNumberString({
            text: 'test-124.525',
            separator: '.',
            allowNegative: true,
        });

        expect(normalizedNumberString).toBe('-124.525');
    });
});
