import { validate, isRequired } from '../../dist'

describe('isRequired', () => {
  describe('handles valid values:', () => {
    test('string', async () => {
      const { isValid } = await validate({ value: 'foo' }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })

    test('number', async () => {
      const { isValid } = await validate({ value: 999 }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })

    test('falsy number', async () => {
      const { isValid } = await validate({ value: 0 }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })

    test('boolean', async () => {
      const { isValid } = await validate({ value: true }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })

    test('Date', async () => {
      const { isValid } = await validate({ value: new Date() }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })

    test('Object', async () => {
      const { isValid } = await validate({ value: { foo: 'bar' } }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })

    test('Array', async () => {
      const { isValid } = await validate({ value: ['foo'] }, { value: [isRequired()]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('empty', async () => {
      const { isValid } = await validate({ value: undefined }, { value: [isRequired()] })
      expect(isValid).toBe(false);
    })

    test('null', async () => {
      // eslint-disable-next-line unicorn/no-null
      const { isValid } = await validate({ value: null }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })

    test('empty string', async () => {
      const { isValid } = await validate({ value: '' }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })

    test('whitespaces', async () => {
      const { isValid } = await validate({ value: ' \t\n' }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })

    test('empty array', async () => {
      const { isValid } = await validate({ value: [] }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })

    test('empty object', async () => {
      const { isValid } = await validate({ value: {} }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    }),

    test('boolean', async () => {
      const { isValid } = await validate({ value: false }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })

    test('NaN', async () => {
      const { isValid } = await validate({ value: Number.NaN }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })

    test('Invalid Date', async () => {
      const { isValid } = await validate({ value: new Date(Number.NaN) }, { value: [isRequired()]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: undefined }, { value: [isRequired('Error message')]})
    expect(errors.value).toBe('Error message');
  })

  describe('with option', () => {
    describe('acceptWhitespaces', () => {
      test('handles whitespaces as valid', async () => {
        const { isValid } = await validate({ value: ' \t\n' }, { value: [isRequired('', { acceptWhitespaces: true })]})
        expect(isValid).toBe(true);
      })
    })
  })
})
