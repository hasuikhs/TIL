
const { add } = require('../src/add');

describe('function test', () => {
    it('add 1+ 1 to be 2', () => {
        expect(add(1, 1)).toBe(2);
    });
});