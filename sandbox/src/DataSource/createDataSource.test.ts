import { createDataSource } from './createDataSource';

describe('Create Data Source', () => {
    test('initialize', () => {
        expect(createDataSource('name', [])).toBeTruthy();
    });
});
