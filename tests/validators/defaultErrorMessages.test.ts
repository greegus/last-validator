import {
  validate,
  setDefaultErrorMessages,
  isRequired ,
  isNumeric,
  isEmail,
  isLessThan,
  isLessOrEqualThan,
  isGreaterThan,
  isGreaterOrEqualThan,
  hasMinLength,
  hasMaxLength
} from '../../dist/index'

describe('defaultErrorMessages', () => {
  it('should return default error messages', async () => {
    setDefaultErrorMessages({
      isRequired: 'is required',
      isNumeric: 'should be a number',
      isEmail: 'invalid email',
      isLessThan: 'should be less than',
      isLessOrEqualThan: 'should be less or equal than',
      isGreaterThan: 'should be greater than',
      isGreaterOrEqualThan: 'should be greater or equal than',
      hasMinLength: 'should have min length',
      hasMaxLength: 'should have max length',
    })

    const data = {
      isRequired: '',
      isNumeric: 'abc',
      isEmail: 'not.an.email',
      isLessThan: 3,
      isLessOrEqualThan: 3,
      isGreaterThan: 3,
      isGreaterOrEqualThan: 3,
      hasMinLength: 'abc',
      hasMaxLength: 'abc'
    }

    const { errors } = await validate<typeof data>(data, {
      isRequired: [isRequired()],
      isNumeric: [isNumeric()],
      isEmail: [isEmail()],
      isLessThan: [isLessThan(2)],
      isLessOrEqualThan: [isLessOrEqualThan(2)],
      isGreaterThan: [isGreaterThan(4)],
      isGreaterOrEqualThan: [isGreaterOrEqualThan(4)],
      hasMinLength: [hasMinLength(4)],
      hasMaxLength: [hasMaxLength(2)],
    })

    expect(errors.isRequired).toBe('is required')
    expect(errors.isNumeric).toBe('should be a number')
    expect(errors.isEmail).toBe('invalid email')
    expect(errors.isLessThan).toBe('should be less than')
    expect(errors.isLessOrEqualThan).toBe('should be less or equal than')
    expect(errors.isGreaterThan).toBe('should be greater than')
    expect(errors.isGreaterOrEqualThan).toBe('should be greater or equal than')
    expect(errors.hasMinLength).toBe('should have min length')
    expect(errors.hasMaxLength).toBe('should have max length')
  })
})
