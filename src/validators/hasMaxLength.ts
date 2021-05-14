import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isNaN from "lodash/isNaN"

import { Validator } from "../../types"
import { isNotSet } from "../utils/isNotSet"

export function hasMaxLength(maxLength: number, message?: string): Validator {
  return ({ value, resolve, reject }) => {
    if (isNotSet(value)) {
      return resolve()
    }

    if (isNumber(value) && !isNaN(value)) {
      value = String(value)
    }

    if (isString(value) && value.length <= maxLength) {
      return resolve()
    }

    reject(message)
  }
}
