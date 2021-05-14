import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isDate from "lodash/isDate"

import { Validator } from "../../types"
import { isNotSet } from "../utils/isNotSet"

export function hasMaxValue(maxValue: number, message?: string): Validator {
  return ({ value, resolve, reject }) => {
    if (isNotSet(value)) {
      return resolve()
    }

    if ((isString(value) || isNumber(value) || isDate(value)) && value <= maxValue) {
      return resolve()
    }

    reject(message)
  }
}
