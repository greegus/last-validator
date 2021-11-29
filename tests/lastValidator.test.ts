import { Validator } from '../src/types'
import { validate, validateAll } from '../dist/index'

function isTrue ({ value, resolve, reject }): Validator {
  return value ? resolve() : reject('Error message')
}

describe('lastValidator', () => {
  describe('#validate', () => {
    test('valid data', async () => {
      const data = {
        foo: true,
        bar: true
      }

      const rules = {
        foo: [isTrue],
        bar: [isTrue]
      }

      const { isValid, errors } = await validate(data, rules)

      expect(errors).toEqual({});
      expect(isValid).toBe(true);
    })

    test('invalid data', async () => {
      const data = {
        foo: true,
        bar: false
      }

      const rules = {
        foo: [isTrue],
        bar: [isTrue]
      }

      const { isValid, errors } = await validate(data, rules)

      expect(errors).toEqual({
        bar: 'Error message'
      });

      expect(isValid).toBe(false);
    })
  })

  describe('#validateAll', () => {
    describe('valid', () => {
      describe('list of objects', () => {
        test('with rules as plain object', async () => {
          const data = [{ foo: true}, { foo: true }]
          const rules = { foo: [isTrue] }

          const { isValid, errors } = await validateAll(data, rules)

          expect(errors).toEqual({});
          expect(isValid).toBe(true);
        })

        test('with rules as callback function', async () => {
          const data = [{ foo: true}, { foo: true }]
          const rules = () => ({ foo: [isTrue] })

          const { isValid, errors } = await validateAll(data, rules)

          expect(errors).toEqual({});
          expect(isValid).toBe(true);
        })
      })
    })

    describe('invalid data', () => {
      test('with rules as plain object', async () => {
        const data = [{ foo: true}, { foo: false }]
        const rules = { foo: [isTrue] }

        const { isValid, errors } = await validateAll(data, rules)

        expect(errors).toEqual({
          1: {
            foo: 'Error message'
          }
        });

        expect(isValid).toBe(false);
      })

      test('with rules as callback function', async () => {
        const data = [{ foo: true}, { foo: false }]
        const rules = () => ({ foo: [isTrue] })

        const { isValid, errors } = await validateAll(data, rules)

        expect(errors).toEqual({
          1: {
            foo: 'Error message'
          }
        });

        expect(isValid).toBe(false);
      })
    })
  })
})