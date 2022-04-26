import { defaultErrorMessages } from "../lastValidator"
import { Validator } from "../types"
import { isGreaterThan } from "./isGreaterThan"

export function isGreaterOrEqualThan(minValue: number | Date, errorMessage?: string): Validator {
  errorMessage = errorMessage || defaultErrorMessages.isGreaterOrEqualThan

  return isGreaterThan(minValue, errorMessage, { orEqual: true })
}
