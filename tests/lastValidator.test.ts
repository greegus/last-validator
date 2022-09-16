import { Validator } from '../src/types'
import { validate } from '../dist/index'

const isTrue: Validator = async (value) => {
  const isValid = value === true
  return { isValid, errors: isValid ? undefined : 'Error message' }
}

describe('lastValidator', () => {
  describe('#validate', () => {
    test('valid data', async () => {
      const data = {
        foo: true,
        bar: true,
        nested: {
          foo: true,
          bar: true,
        }
      }

      const rules = {
        foo: [isTrue],
        bar: [isTrue],
        nested: {
          foo: [isTrue],
          bar: [isTrue],
        }
      }

      const { isValid, errors } = await validate(data, rules)

      expect(errors).toStrictEqual({
        foo: [undefined],
        bar: [undefined],
        nested: {
          foo: [undefined],
          bar: [undefined]
        }
      });

      expect(isValid).toBe(true);
    })

    test('invalid data', async () => {
      const data = {
        foo: true,
        bar: false,
        deep: {
          bar: false
        }
      }

      const rules = {
        foo: [isTrue],
        bar: [isTrue],
        deep: {
          bar: [isTrue]
        }
      }

      const { isValid, errors } = await validate(data, rules)

      expect(errors).toStrictEqual({
        foo: [undefined],
        bar: ['Error message'],
        deep: {
          bar: ['Error message']
        }
      });

      expect(isValid).toBe(false);
    })
  })
})
