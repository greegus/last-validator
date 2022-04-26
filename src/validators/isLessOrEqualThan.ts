import { defaultErrorMessages } from "../lastValidator"
import { Validator } from "../types"
import { isLessThan } from "./isLessThan"

export function isLessOrEqualThan(maxValue: number | Date, errorMessage?: string): Validator {
  errorMessage = errorMessage || defaultErrorMessages.isLessOrEqualThan

  return isLessThan(maxValue, errorMessage, { orEqual: true })
}
