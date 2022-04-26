export const defaultErrorMessages = {
  isRequired: '',
  isNumeric: '',
  isEmail: '',
  isLessThan: '',
  isLessOrEqualThan: '',
  isGreaterThan: '',
  isGreaterOrEqualThan: '',
  hasMinLength: '',
  hasMaxLength: '',
}

export function setDefaultErrorMessages(errorMessages: Partial<typeof defaultErrorMessages>) {
  Object.assign(defaultErrorMessages, errorMessages)
}