export type Validator = (options: {
  value: any
  data: any
  resolve: () => void
  reject: (message?: any) => void
}) => Promise<void> | void

export type ValidationErrors<T = any> = {
  [key in keyof T]?: any
}

export type ValidationResults<T = any> = {
  isValid: boolean
  errors: ValidationErrors<T>
}

export type ValidationRules<T = any> = {
  [key in keyof T]?: Validator[]
}
