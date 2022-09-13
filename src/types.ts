export * from './index'

export type Validator<T extends Record<string, any> = any> = (
  value: T[keyof T],
  data: T
) => Promise<{isValid: boolean; errors?: string | string[] | ValidationErrors<T>}>

export type ValidationErrors<T extends Record<string, any> = any> = {
  [key in keyof T]?: (boolean | string | ValidationErrors)[] | undefined
}

export type ValidationResults<T extends Record<string, any> = any> = {
  isValid: boolean
  errors: ValidationErrors<T>
}

export type ValidationRules<T extends Record<string, any> = any> = {
  [key in keyof Partial<T>]:
    | Validator[]
    | ValidationRules<T[key]>
    | ((value: T[key], data: T) => Validator[] | ValidationRules<T[key]> | undefined)
    | undefined
}
