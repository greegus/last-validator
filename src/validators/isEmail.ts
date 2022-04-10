import { Validator } from "../types"
import { test } from './test'

export const emailPattern = /^(([^\s"(),.:;<>@[\\\]]+(\.[^\s"(),.:;<>@[\\\]]+)*)|(".+"))@((\[(?:\d{1,3}\.){3}\d{1,3}])|(([\dA-Za-z\-]+\.)+[A-Za-z]{2,}))$/

export const isEmail = (errorMessage?: string): Validator => {
  return test(value => emailPattern.test(value), errorMessage)
}
