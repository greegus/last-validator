import { validate, isGreaterOrEqualThan } from '../../dist'

const minValue = 10
const minDate = new Date(2010)

describe('#isGreaterOrEqualThan', () => {
  describe('handles valid values:', () => {
    test('11', async () => {
      const { isValid } = await validate({ value: 11 }, { value: [isGreaterOrEqualThan(minValue)]})
      expect(isValid).toBe(true);
    })

    test('"11"', async () => {
      const { isValid } = await validate({ value: '11' }, { value: [isGreaterOrEqualThan(minValue)]})
      expect(isValid).toBe(true);
    })

    test('equal value', async () => {
      const { isValid } = await validate({ value: minValue }, { value: [isGreaterOrEqualThan(minValue)]})
      expect(isValid).toBe(true);
    })

    test('Date', async () => {
      const { isValid } = await validate({ value: new Date(2011) }, { value: [isGreaterOrEqualThan(minDate)]})
      expect(isValid).toBe(true);
    })

    test('undefined', async () => {
      const { isValid } = await validate({ value: undefined }, { value: [isGreaterOrEqualThan(minDate)]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('9', async () => {
      const { isValid } = await validate({ value: 9 }, { value: [isGreaterOrEqualThan(minValue)]})
      expect(isValid).toBe(false);
    })

    test('"9"', async () => {
      const { isValid } = await validate({ value: '9' }, { value: [isGreaterOrEqualThan(minValue)]})
      expect(isValid).toBe(false);
    })

    test('date in past', async () => {
      const { isValid } = await validate({ value: new Date(2009) }, { value: [isGreaterOrEqualThan(minDate)]})
      expect(isValid).toBe(false);
    })

    test('Invalid Date', async () => {
      const { isValid } = await validate({ value: new Date(Number.NaN) }, { value: [isGreaterOrEqualThan(minDate)]})
      expect(isValid).toBe(false);
    })

    test('object', async () => {
      const { isValid } = await validate({ value: {} }, { value: [isGreaterOrEqualThan(minValue)]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 9 }, { value: [isGreaterOrEqualThan(minValue, 'Error message')]})
    expect(errors.value).toStrictEqual(['Error message']);
  })
})
