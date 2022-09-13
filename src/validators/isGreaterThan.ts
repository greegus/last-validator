import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isDate from "lodash/isDate"

import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"
import { defaultErrorMessages } from "../defaultErrorMessages"
import { test } from './test'

export function isGreaterThan(minValue: number | Date, errorMessage?: string, { orEqual }: { orEqual?: boolean } = {}): Validator {
  errorMessage = errorMessage || defaultErrorMessages.isGreaterThan

  return test((value) => {
    if (isNotSet(value)) {
      return true
    }

    if ((isString(value) || isNumber(value) || isDate(value)) && (orEqual ? value >= minValue : value > minValue)) {
      return true
    }

  }, errorMessage)
}
