import { validate, isNumeric } from '../../dist'

describe('isNumeric', () => {
  describe('handles valid values:', () => {
    test('number', async () => {
      const { isValid } = await validate({ value: 1}, { value: [isNumeric()]})
      expect(isValid).toBe(true);
    })

    test('falsy number', async () => {
      const { isValid } = await validate({ value: 0}, { value: [isNumeric()]})
      expect(isValid).toBe(true);
    })

    test('number in string', async () => {
      const { isValid } = await validate({ value: '1'}, { value: [isNumeric()]})
      expect(isValid).toBe(true);
    })

    test('falsy number in string', async () => {
      const { isValid } = await validate({ value: '0'}, { value: [isNumeric()]})
      expect(isValid).toBe(true);
    })

    test('undefined', async () => {
      const { isValid } = await validate({ value: undefined}, { value: [isNumeric()]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('string', async () => {
      const { isValid } = await validate({ value: 'lorem ipsum'}, { value: [isNumeric()]})
      expect(isValid).toBe(false);
    })

    test('NaN', async () => {
      const { isValid } = await validate({ value: Number.NaN }, { value: [isNumeric()]})
      expect(isValid).toBe(false);
    })

    test('object', async () => {
      const { isValid } = await validate({ value: { foo: 'bar' } }, { value: [isNumeric()]})
      expect(isValid).toBe(false);
    })

    test('array', async () => {
      const { isValid } = await validate({ value: ['foor'] }, { value: [isNumeric()]})
      expect(isValid).toBe(false);
    })

    test('Date', async () => {
      const { isValid } = await validate({ value: new Date()}, { value: [isNumeric()]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 'dolor sid amed' }, { value: [isNumeric('Error message')]})
    expect(errors.value).toBe('Error message');
  })
});