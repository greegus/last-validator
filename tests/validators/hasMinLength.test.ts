import { validate, hasMinLength } from '../../dist/index'

const minLength = 6

describe('hasMinLength', () => {
  describe('handles valid values:', () => {
    test('longer string', async () => {
      const { isValid } = await validate({ value: 'dolor sid amed'}, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(true);
    })

    test('string with min length', async () => {
      const { isValid } = await validate({ value: 'mauris'}, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(true);
    })

    test('empty string', async () => {
      const { isValid } = await validate({ value: ''}, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(true);
    })

    test('number with more digits then minLength', async () => {
      const { isValid } = await validate({ value: 1_000_000}, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(true);
    })

    test('undefined', async () => {
      const { isValid } = await validate({ value: undefined}, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('shorter string', async () => {
      const { isValid } = await validate({ value: 'lorem'}, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(false);
    })

    test('object with "length" property', async () => {
      const { isValid } = await validate({ value: { length: 5 } }, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(false);
    })

    test('array with fewer items', async () => {
      const { isValid } = await validate({ value: Array.from({ length: 5 }) }, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(false);
    })

    test('number with more digits then minLength', async () => {
      const { isValid } = await validate({ value: 10_000 }, { value: [hasMinLength(minLength)]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 'lorem' }, { value: [hasMinLength(minLength, 'Error message')]})
    expect(errors.value).toBe('Error message');
  })
});