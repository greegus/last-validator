import { validate, isEqual, isRequired, isGreaterOrEqualThan, validBy } from '../../dist/index'

describe('using nested validator', () => {
  it('', async () => {
    const car = {
      brand: 'blue',
      numberOfWheels: 4,
      driver: {
        name: 'John',
        age: 21,
        hasDrivingLicence: undefined,
      }
    }

    const driverValidator = (data: typeof car['driver']) => validate(data, {
      age: [isGreaterOrEqualThan(15)],
      hasDrivingLicence: [isRequired()]
    })

    const carValidator = (data: typeof car) => validate(data, {
      numberOfWheels: [isEqual(4)],
      driver: [validBy(driverValidator)]
    })

    const { isValid, errors } = await carValidator(car)

    expect(isValid).toBe(false)
  })
})