import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isNaN from "lodash/isNaN"

import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"
import { defaultErrorMessages } from "../defaultErrorMessages"
import { test } from './test'

export function isNumeric(errorMessage?: string): Validator {
  errorMessage = errorMessage || defaultErrorMessages.isNumeric

  return test((value) => {
    if (isNotSet(value)) {
      return true
    }

    if (isString(value)) {
      value = Number(value)
    }

    if (isNumber(value) && !isNaN(value)) {
      return true
    }
  }, errorMessage)
}
