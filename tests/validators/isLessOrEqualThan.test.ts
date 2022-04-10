import { validate, isLessOrEqualThan } from '../../dist/index'

const maxValue = 10
const minDate = new Date(2010)

describe('isLessOrEqualThan', () => {
  describe('handles valid values:', () => {
    test('9', async () => {
      const { isValid } = await validate({ value: 9 }, { value: [isLessOrEqualThan(maxValue)]})
      expect(isValid).toBe(true);
    })

    test('"9"', async () => {
      const { isValid } = await validate({ value: '9' }, { value: [isLessOrEqualThan(maxValue)]})
      expect(isValid).toBe(true);
    })

    test('equal value', async () => {
      const { isValid } = await validate({ value: maxValue }, { value: [isLessOrEqualThan(maxValue)]})
      expect(isValid).toBe(true);
    })

    test('Date', async () => {
      const { isValid } = await validate({ value: new Date(2009) }, { value: [isLessOrEqualThan(minDate)]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('11', async () => {
      const { isValid } = await validate({ value: 11 }, { value: [isLessOrEqualThan(maxValue)]})
      expect(isValid).toBe(false);
    })

    test('"11"', async () => {
      const { isValid } = await validate({ value: '11' }, { value: [isLessOrEqualThan(maxValue)]})
      expect(isValid).toBe(false);
    })

    test('date in past', async () => {
      const { isValid } = await validate({ value: new Date(2011) }, { value: [isLessOrEqualThan(minDate)]})
      expect(isValid).toBe(false);
    })

    test('Invalid Date', async () => {
      const { isValid } = await validate({ value: new Date(Number.NaN) }, { value: [isLessOrEqualThan(minDate)]})
      expect(isValid).toBe(false);
    })

    test('object', async () => {
      const { isValid } = await validate({ value: {} }, { value: [isLessOrEqualThan(maxValue)]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 11 }, { value: [isLessOrEqualThan(maxValue, 'Error message')]})
    expect(errors.value).toBe('Error message');
  })
})
