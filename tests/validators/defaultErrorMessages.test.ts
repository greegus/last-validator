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

describe('defaultErrorMessages should set a default error message for', () => {
  it('`isRequired`', async () => {
    setDefaultErrorMessages({ isRequired: 'is required' })

    const { errors } = await validate({ isRequired: ''}, {  isRequired: [isRequired()] })

    expect(errors.isRequired).toStrictEqual(['is required'])
  })

  it('`isNumeric`', async () => {
    setDefaultErrorMessages({ isNumeric: 'should be a number' })

    const { errors } = await validate({ isNumeric: 'abc' }, { isNumeric: [isNumeric()] })

    expect(errors.isNumeric).toStrictEqual(['should be a number'])
  })

  it('`isEmail`', async () => {
    setDefaultErrorMessages({ isEmail: 'invalid email' })

    const { errors } = await validate({ isEmail: 'not.an.email' }, { isEmail: [isEmail()] })

    expect(errors.isEmail).toStrictEqual(['invalid email'])
  })

  it('`isLessThan`', async () => {
    setDefaultErrorMessages({ isLessThan: 'should be less than' })

    const { errors } = await validate({ isLessThan: 3 }, { isLessThan: [isLessThan(2)] })

    expect(errors.isLessThan).toStrictEqual(['should be less than'])
  })

  it('`isLessThan`', async () => {
    setDefaultErrorMessages({ isLessThan: 'should be less than' })

    const { errors } = await validate({ isLessThan: 3 }, { isLessThan: [isLessThan(2)] })

    expect(errors.isLessThan).toStrictEqual(['should be less than'])
  })

  it('`isLessOrEqualThan`', async () => {
    setDefaultErrorMessages({ isLessOrEqualThan: 'should be less or equal than' })

    const { errors } = await validate({ isLessOrEqualThan: 3 }, { isLessOrEqualThan: [isLessOrEqualThan(2)] })

    expect(errors.isLessOrEqualThan).toStrictEqual(['should be less or equal than'])
  })

  it('`isGreaterThan`', async () => {
    setDefaultErrorMessages({ isGreaterThan: 'should be greater than' })

    const { errors } = await validate({ isGreaterThan: 3 }, { isGreaterThan: [isGreaterThan(4)] })

    expect(errors.isGreaterThan).toStrictEqual(['should be greater than'])
  })

  it('`isGreaterOrEqualThan`', async () => {
    setDefaultErrorMessages({ isGreaterOrEqualThan: 'should be greater or equal than' })

    const { errors } = await validate({ isGreaterOrEqualThan: 3 }, { isGreaterOrEqualThan: [isGreaterOrEqualThan(4)] })

    expect(errors.isGreaterOrEqualThan).toStrictEqual(['should be greater or equal than'])
  })

  it('`hasMinLength`', async () => {
    setDefaultErrorMessages({ hasMinLength: 'should have min length' })

    const { errors } = await validate({ hasMinLength: 'abc' }, { hasMinLength: [hasMinLength(4)] })

    expect(errors.hasMinLength).toStrictEqual(['should have min length'])
  })

  it('`hasMaxLength`', async () => {
    setDefaultErrorMessages({ hasMaxLength: 'should have max length' })

    const { errors } = await validate({ hasMaxLength: 'abc' }, { hasMaxLength: [hasMaxLength(2)] })

    expect(errors.hasMaxLength).toStrictEqual(['should have max length'])
  })
})