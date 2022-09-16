import { validate, isEqual } from '../../dist/index'

describe('#isEqual', () => {
  describe('handles valid values:', () => {
    test('"text"', async () => {
      const { isValid } = await validate({ value: 'text' }, { value: [isEqual('text')]})
      expect(isValid).toBe(true);
    })

    test('boolean', async () => {
      const { isValid } = await validate({ value: true }, { value: [isEqual(true)]})
      expect(isValid).toBe(true);
    })
  })
  describe('handles invalid values:', () => {
    test('"false"', async () => {
      const { isValid, errors } = await validate({ value: 'false' }, { value: [isEqual(false, 'Invalid value')]})
      expect(isValid).toBe(false);
      expect(errors?.value).toStrictEqual(['Invalid value']);
    })

    test('truthy vs boolean', async () => {
      const { isValid, errors } = await validate({ value: 'true' }, { value: [isEqual(true, 'Invalid value')]})
      expect(isValid).toBe(false);
      expect(errors?.value).toStrictEqual(['Invalid value']);
    })

    test('falsy vs undefined', async () => {
      const { isValid, errors } = await validate({ value: 0 }, { value: [isEqual(false, 'Invalid value')]})
      expect(isValid).toBe(false);
      expect(errors?.value).toStrictEqual(['Invalid value']);
    })
  })
});