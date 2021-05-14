import { Validator } from "../../types"

import isNumber from 'lodash/isNumber'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import isDate from 'lodash/isDate'

export const isRequired = (message?: string, { acceptWhitespaces }: { acceptWhitespaces?: boolean } = {}): Validator => {
  return ({ value, resolve, reject }) => {
    if (value === true) {
      return resolve()
    }

    if (isNumber(value) && !isNaN(value)) {
      return resolve()
    }

    if (isDate(value)) {
      return isNaN(value?.getTime()) ? reject(message) : resolve()
    }

    if (!acceptWhitespaces && typeof value === 'string') {
      value = value.trim()
    }

    if (!isEmpty(value)) {
      return resolve()
    }

    reject(message)
  }
}
