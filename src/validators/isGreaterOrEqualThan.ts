import { Validator } from "../types"
import { isGreaterThan } from "./isGreaterThan"

export function isGreaterOrEqualThan(minValue: number | Date, errorMessage?: string): Validator {
  return isGreaterThan(minValue, errorMessage, { orEqual: true })
}
