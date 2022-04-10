import isNumber from "lodash/isNumber"
import isString from "lodash/isString"
import isDate from "lodash/isDate"

import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"

export function isLessThan(minValue: number | Date, errorMessage?: string, { orEqual }: { orEqual?: boolean } = {}): Validator {
  return ({ value, resolve, reject }) => {
    if (isNotSet(value)) {
      return resolve()
    }

    if ((isString(value) || isNumber(value) || isDate(value)) && (orEqual ? value <= minValue : value < minValue)) {
      return resolve()
    }

    reject(errorMessage)
  }
}
