import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isNaN from "lodash/isNaN"

import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"
import { defaultErrorMessages } from "../defaultErrorMessages"
import { test } from './test'

export function hasMinLength(minLength: number, errorMessage?: string): Validator {
  errorMessage = errorMessage || defaultErrorMessages.hasMinLength

  return test((value) => {
    if (isNotSet(value)) {
      return true
    }

    if (isNumber(value) && !isNaN(value)) {
      value = String(value)
    }

    if (isString(value) && value.length >= minLength) {
      return true
    }

  }, errorMessage)
}
