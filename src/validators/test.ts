import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"

export const test = (
  condition: (value: any) => Promise<boolean | undefined> | boolean | undefined,
  errorMessage?: string
): Validator => {
  return async (value) => {
    if (isNotSet(value)) {
      return { isValid: true }
    }

    if (await condition(value)) {
      return { isValid: true }
    }

    return { isValid: false, errors: errorMessage }
  }
}