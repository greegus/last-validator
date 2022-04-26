import { validate, hasMaxLength } from '../../dist'

const maxLength = 6

describe('hasMaxLength', () => {
  describe('handles valid values:', () => {
    test('shorter string', async () => {
      const { isValid } = await validate({ value: 'lorem'}, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(true);
    })

    test('string with max length', async () => {
      const { isValid } = await validate({ value: 'mauris'}, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(true);
    })

    test('empty string', async () => {
      const { isValid } = await validate({ value: ''}, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(true);
    })

    test('number with fewer digits then minLength', async () => {
      const { isValid } = await validate({ value: 10_000 }, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(true);
    })

    test('undefined', async () => {
      const { isValid } = await validate({ value: undefined}, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('longer string', async () => {
      const { isValid } = await validate({ value: 'dolor sid amed'}, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(false);
    })

    test('object with "length" property', async () => {
      const { isValid } = await validate({ value: { length: 7 } }, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(false);
    })

    test('array with more items', async () => {
      const { isValid } = await validate({ value: Array.from({ length: 7 }) }, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(false);
    })

    test('number with more digits then maxLength', async () => {
      const { isValid } = await validate({ value: 1_000_000 }, { value: [hasMaxLength(maxLength)]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 'dolor sid amed' }, { value: [hasMaxLength(maxLength, 'Error message')]})
    expect(errors.value).toBe('Error message');
  })
});