import { ValidationResults, Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"

export const validBy = <T extends Record<string, any> = any>(
  validation: (value: any) => Promise<ValidationResults<T>>
): Validator => {
  return async (value) => {
    if (isNotSet(value)) {
      return { isValid: true }
    }

    return validation(value)
  }
}