import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isNaN from "lodash/isNaN"

import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"
import { defaultErrorMessages } from "../defaultErrorMessages"

export function isNumeric(errorMessage?: string): Validator {
  errorMessage = errorMessage || defaultErrorMessages.isNumeric

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

    reject(errorMessage)
  }
}
