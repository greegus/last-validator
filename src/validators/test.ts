import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"

export const test = (condition: (value: any) => Promise<boolean> | boolean, errorMessage?: string): Validator => {
  return async ({ value, resolve, reject }) => {
    if (isNotSet(value)) {
      return resolve()
    }

    if (await condition(value)) {
      return resolve()
    }

    reject(errorMessage)
  }
}