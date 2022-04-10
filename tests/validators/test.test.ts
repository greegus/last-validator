import { validate, test as inlineTest } from '../../dist/index'

describe('test', () => {
  test('handles valid values:', async () => {
    const { isValid } = await validate({ cake: { flavour: 'chocolate' } }, { cake: [inlineTest(cake => cake.flavour === 'chocolate')] })
    expect(isValid).toBe(true);
  })

  describe('handles invalid values:', () => {
    test('string', async () => {
      const { isValid } = await validate({ cake: { flavour: 'blueberry' } }, { cake: [inlineTest(cake => cake.flavour === 'chocolate')] })
      expect(isValid).toBe(false);
    })
  })

  test('returns error message', async () => {
    const { errors } = await validate({ cake: { flavour: 'blueberry' } }, { cake: [inlineTest(cake => cake.flavour === 'chocolate', 'Cake flavour must be chocolate')] })
    expect(errors.cake).toBe('Cake flavour must be chocolate');
  })
});