import { Validator } from "../types"
import { isLessThan } from "./isLessThan"

export function isLessOrEqualThan(maxValue: number | Date, errorMessage?: string): Validator {
  return isLessThan(maxValue, errorMessage, { orEqual: true })
}
