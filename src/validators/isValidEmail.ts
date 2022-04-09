import { Validator } from "../types"
import { isNotSet } from "../utils/isNotSet"

export const emailPattern = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/

export const isValidEmail = (message?: string): Validator => {
  return ({ value, resolve, reject }) => {
    if (isNotSet(value)) {
      return resolve()
    }

    if (emailPattern.test(String(value))) {
      return resolve()
    }

    reject(message)
  }
}
