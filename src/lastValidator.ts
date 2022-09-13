import { ValidationResults, ValidationRules, Validator } from './types'

export async function validate<T extends Record<string, any> = any>(data: T, rules: ValidationRules<T>): Promise<ValidationResults<T>> {
  const promises = (Object.entries(rules)).map(async ([attribute, validators]: [string, ValidationRules<T>[string]]) => {
    // Sanitize attributes with undefined validators
    if (!validators) {
      validators = [] as any
    }

    // Generate validators array if a function is provided
    if (typeof validators === 'function') {
      validators = validators(data[attribute], data)
    }

    // Recursive validation of nested attributes
    if (typeof validators === 'object' && validators !== null && !Array.isArray(validators)) {
      const results = await validate(data[attribute], validators)
      return { attribute, ...results }
    }

    // Execute all validators
    const promises = (validators as Validator[]).map((validator) => validator(data[attribute], data))
    const results = await Promise.all(promises)

    // Process results
    const isValid = results.every(result => result.isValid)
    const errors = results.map(result => result.isValid ? undefined : (result.errors || true))

    return { attribute, isValid, errors }
  })

  // Execute validation of all of the attributes
  const results = (await Promise.all(promises))

  const isValid = results.every(result => result.isValid)
  const errors = results.reduce((errorsByAttribute, result) => ({ ...errorsByAttribute, [result.attribute]: result.errors }), {})

  return {
    isValid,
    errors
  }
}
