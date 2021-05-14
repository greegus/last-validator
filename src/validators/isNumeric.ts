import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isNaN from "lodash/isNaN"

import { Validator } from "../../types"
import { isNotSet } from "../utils/isNotSet"

export function isNumeric(message?: string): Validator {
  return ({ value, resolve, reject }) => {
    if (isNotSet(value)) {
      return resolve()
    }

    if (isString(value)) {
      value = Number(value)
    }

    if (isNumber(value) && !isNaN(value)) {
      return resolve()
    }

    reject(message)
  }
}
