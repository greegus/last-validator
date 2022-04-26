import { validate, isEmail } from '../../dist'

describe('isEmail', () => {
  describe('handles valid values:', () => {
    test('"email@example.com"', async () => {
      const { isValid } = await validate({ value: 'email@example.com' }, { value: [isEmail()]})
      expect(isValid).toBe(true);
    })

    test('"email+1@sub.example.com"', async () => {
      const { isValid } = await validate({ value: 'email+1@sub.example.com' }, { value: [isEmail()]})
      expect(isValid).toBe(true);
    })

    test('undefined', async () => {
      const { isValid } = await validate({ value: undefined }, { value: [isEmail()]})
      expect(isValid).toBe(true);
    })
  })

  describe('handles invalid values:', () => {
    test('number', async () => {
      const { isValid } = await validate({ value: 999 }, { value: [isEmail()]})
      expect(isValid).toBe(false);
    })

    test('"lookslike(at)email.com"', async () => {
      const { isValid } = await validate({ value: 'lookslike(at)email.com' }, { value: [isEmail()]})
      expect(isValid).toBe(false);
    })

    test('boolean', async () => {
      const { isValid } = await validate({ value: true }, { value: [isEmail()]})
      expect(isValid).toBe(false);
    })

    test('object', async () => {
      const { isValid } = await validate({ value: {} }, { value: [isEmail()]})
      expect(isValid).toBe(false);
    })

    test('array', async () => {
      const { isValid } = await validate({ value: [] }, { value: [isEmail()]})
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ value: 'lookslike(at)email.com' }, { value: [isEmail('Error message')]})
    expect(errors.value).toBe('Error message');
  })
});