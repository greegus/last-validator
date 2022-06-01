import { Validator } from "../types"

import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import isDate from 'lodash/isDate'
import { defaultErrorMessages } from "../defaultErrorMessages"

export const isRequired = (errorMessage?: string, { acceptWhitespaces }: { acceptWhitespaces?: boolean } = {}): Validator => {
  errorMessage = errorMessage || defaultErrorMessages.isRequired

  return ({ value, resolve, reject }) => {
    if (value === true) {
      return resolve()
    }

    if (isNumber(value) && !isNaN(value)) {
      return resolve()
    }

    if (isDate(value)) {
      return isNaN(value?.getTime()) ? reject(errorMessage) : resolve()
    }

    if (!acceptWhitespaces && typeof value === 'string') {
      value = value.trim()
    }

    // Dummy way of testing a Blob
    if (value && typeof value === 'object' && 'arrayBuffer' in value) {
      return resolve()
    }

    if (!isEmpty(value)) {
      return resolve()
    }

    reject(errorMessage)
  }
}
