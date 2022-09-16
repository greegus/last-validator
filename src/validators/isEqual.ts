import { Validator } from "../types"
import { test } from './test'

export const isEqual = (value: any, errorMessage?: string): Validator => {
  return test(v => v === value, errorMessage)
}
