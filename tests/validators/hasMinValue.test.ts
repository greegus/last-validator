import { validate } from '../../dist/index'
import { hasMinValue } from '../../dist/validators/hasMinValue'

const minValue = 10
const minDate = new Date(2010)

describe('hasMinValue', () => {
  describe('handles valid values:', () => {
    test('11', async () => {
      const { isValid } = await validate({ value: 11 }, { value: [hasMinValue(minValue)]})
      expect(isValid).toBe(true);
    })

    test('"11"', async () => {
      const { isValid } = await validate({ value: '11' }, { value: [hasMinValue(minValue)]})
      expect(isValid).toBe(true);
    })

    test('equal value', async () => {
      const { isValid } = await validate({ value: minValue }, { value: [hasMinValue(minValue)]})
      expect(isValid).toBe(true);
    })

    test('Date', async () => {
      const { isValid } = await validate({ value: new Date(2011) }, { value: [hasMinValue(minDate)]})
      expect(isValid).toBe(true);
    })

    test('undefined', async () => {
      const { isValid } = await validate({ value: undefined }, { value: [hasMinValue(minDate)]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('9', async () => {
      const { isValid } = await validate({ value: 9 }, { value: [hasMinValue(minValue)]})
      expect(isValid).toBe(false);
    })

    test('"9"', async () => {
      const { isValid } = await validate({ value: '9' }, { value: [hasMinValue(minValue)]})
      expect(isValid).toBe(false);
    })

    test('date in past', async () => {
      const { isValid } = await validate({ value: new Date(2009) }, { value: [hasMinValue(minDate)]})
      expect(isValid).toBe(false);
    })

    test('Invalid Date', async () => {
      const { isValid } = await validate({ value: new Date(Number.NaN) }, { value: [hasMinValue(minDate)]})
      expect(isValid).toBe(false);
    })

    test('object', async () => {
      const { isValid } = await validate({ value: {} }, { value: [hasMinValue(minValue)]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 9 }, { value: [hasMinValue(minValue, 'Error message')]})
    expect(errors.value).toBe('Error message');
  })
})
