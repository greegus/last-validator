import { validate, ValidationRules, Validator } from "../types";

function routine(method: 'every' | 'some') {
  return <T extends Record<string, any> = any>(rules: ValidationRules<T> | ValidationRules[keyof T] | ((value: T[keyof T], data: T) => Validator[])): Validator => {
    return async (value, data) => {
      if (!value) {
        rules = []
      }

      if (typeof rules === 'function') {
        rules = rules(value, data)
      }

      if (typeof rules === 'object' && rules !== null && !Array.isArray(rules)) {
        return validate(value, rules)
      }

      const promises = value.map(async (value: any) => {
        const { errors, isValid } = await validate({ value }, { value: rules } as ValidationRules)
        return { isValid, errors: errors.value }
      })

      const results = await Promise.all(promises)
      const isValid = results[method](result => result?.isValid)
      const errors = isValid ? {} : results.reduce((accumulator, result, index) => ({ ...accumulator, [index]: result.errors }), {})

      return { isValid, errors }
    }
  }
}

export const every = routine('every');
export const some = routine('some');
