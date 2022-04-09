import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import set from 'lodash/set'
import { Validator, ValidationResults, ValidationRules } from './types'

function validateAttributeValue(data: any, attribute: string, validator: Validator) {
  const value = get(data, attribute)

  if (typeof validator !== 'function') {
    return
  }

  return new Promise<void>((resolve) => {
    validator({
      value,
      data,
      resolve: () => resolve(),
      reject: (messsage) => resolve(messsage || true)
    })
  })
}

export async function validate<T = any>(data: any, rules: ValidationRules<T>): Promise<ValidationResults<T>> {
  const promises = (Object.entries(rules) as [string, Validator[]][]).map(async ([attribute, validators]) => {
    const useValidator = (validator: Validator) => validateAttributeValue(data, attribute, validator)

    const results = await Promise.all(validators.map(useValidator))
    const errors = results.filter(Boolean)

    return { attr: attribute, errors }
  })

  const errors = (await Promise.all(promises))
    .filter(({ errors }) => errors.length > 0)
    .reduce((errorsByAttribute, error) => set(errorsByAttribute, error.attr, error.errors.shift()), {})

  return {
    isValid: isEmpty(errors),
    errors
  }
}

export async function validateAll<T = any>(
  items: T[],
  rules: object | ((item: T) => ValidationRules)
): Promise<ValidationResults<T>> {
  const validations = items.map(async (item) =>
    validate(item, typeof rules === 'function' ? rules(item) : rules)
  )

  const results: ValidationResults<T> = (await Promise.all(validations)).reduce(
    (results, { isValid, errors }, index) => {
      return {
        isValid: results.isValid && isValid,
        errors: isEmpty(errors) ? results.errors : { ...results.errors, [index]: errors }
      }
    },
    {
      isValid: true,
      errors: {}
    }
  )

  return results
}
