import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import isDate from 'lodash/isDate'
import { defaultErrorMessages } from "../defaultErrorMessages"
import { Validator } from "../types"

export const isRequired = (errorMessage?: string, { acceptWhitespaces }: { acceptWhitespaces?: boolean } = {}): Validator => {
  errorMessage = errorMessage || defaultErrorMessages.isRequired

  return async (value) => {
    if (value === true) {
      return { isValid: true}
    }

    if (isNumber(value) && !isNaN(value)) {
      return { isValid: true}
    }

    if (isDate(value)) {
      const isValid = !isNaN(value?.getTime())
      return { isValid, errors: isValid ? undefined : errorMessage}
    }

    // Dummy way of testing a Blob
    if (value && typeof value === 'object' && 'arrayBuffer' in value) {
      return { isValid: true }
    }

    const formatedValue = typeof value === 'string' && !acceptWhitespaces
      ? (value as string).trim()
      : value

    if (!isEmpty(formatedValue)) {
      return { isValid: true }
    }

    return { isValid: false, errors: errorMessage }
  }
}
