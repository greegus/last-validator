
# Last Validation Service

Simple and extendable asynchronous object validation tool.

## Install

```
npm i last-validator
```

```
yarn add last-validator
```

## Usage

```typescript
import { validate, isRequired, isEmail, isGreaterOrEqualThan } from 'last-validator'

const data = {
  fullName: '',
  email: 'invalid(at)email.com',
  age: 38,
  address: {
    street: '',
    city: '',
    state: ''
  }
  keywords: ['foo', '', 'barbarbarbarbarbarbarbarbar']
}

const rules = {
  fullName: [isRequired()],
  email: [isRequired(), isEmail()],
  age: [isRequired(), isGreaterOrEqualThan(15, "*Sigh*, you're too young to drive this thing!")],
  address: {
    street: [isRequired('Street is required')],
    city: [isRequired('City is required')],
    state: [isRequired('State is required')]
  },
  keywords: every([isRequired(), hasMaxLength(24)])
}

const { isValid, errors } = await validate(data, rules)

/*
  isValid: false
  errors: {
    fullName: true
    email: [true]
    age: ['*Sigh*, you're too young to drive this thing!'],
    address: {
      street: 'Street is required',
      city: 'City is required'
      state: 'State is required'
    },
    keywords: [
      1: [true, undefined]
      2: [undefined, true]
    ]
  }
*/
```



If you need to define rules object dynamically you can pass it as a function that would generate it on the fly

```typescript
const jobApplication = (job) => ({
  createdAt: [isLessOrEqualThan(job.startDate)]
})
```

The same applies for the list of validators

```typescript
const jobApplication = {
  createdAt: (job) => [isLessOrEqualThan(job.startDate)]
}
```

## Build-in validators

- `isRequired(errorMessage?: string)`
- `isNumeric(errorMessage?: string)`
- `isGreaterThan(minValue: number | Date, errorMessage?: string)`
- `isGreaterOrEqualThan(minValue: number | Date, errorMessage?: string)`
- `isLessThan(maxValue: number | Date, errorMessage?: string)`
- `isLessOrEqualThan(maxValue: number | Date, errorMessage?: string)`
- `hasMinLength(minLength: number, errorMessage?: string)`
- `hasMaxLength(maxLength: number, errorMessage?: string)`
- `isEmail(errorMessage?: string)`
- `test(condition: (value: any) => Promise<boolean> | boolean, errorMessage?: string)`

Array validations helpers
- `every(validators: Validator[])`
- `some(validators: Validator[])`

Nested validation helper
- `validBy(validation: () => Promise<ValidationResults>)`

## Writing custom validators

```typescript
import { validate, Validator } from 'last-validator'

const isValidAddress: Validator = async ({ value, resolve, reject }) => {
  const result = await validateAddressOnBackend(value)
  result ? resolve() : reject('Invalid address')
}

const address = { ... }
const { isValid, errors } = await validate({ address }, { address: [isValidAddress] })
```

### `test` validator helper

In order to streamline usage of custom validations you can also leverage the `test` inline validator.

```typescript
const rules = {
  cake: [isRequired(), test(cake => cake.flavour === 'chocolate', 'Only chocolate cakes are accepted here')]

  // ...
}
```

## Composed/nested validation methods

When your data structure contain an object that already have an existing validation method, you can reuse that method using `validBy` helper.

```typescript
const driver = {
  name: 'Mad Max',
  hasDrivingLicence: true
}

const car = {
  type: 'Pursuit Special',
  color: 'dark',
  fuel: 100,
  driver
}

const validateDriver = (driver) => validate(driver, {
  name: isRequired()
  hasDrivingLicence: isRequired()
})

const validateCar = (car) => validate(car, {
  fuel: [isRequired(), isGreaterOrEqualThan(80)]
  driver: validBy(driverValidator),
})

const results = await validateCar(car)
```

## Array validations

For testing values containing array, you can use `every` and `some` validation helpers, working respectfully to the JS Array methods.

```typescript
const data = {
  keywords: [
    'validator',
    'data validation',
    '',
    'Simple and extendable asynchronous object validation tool'
  ]
}

const rules = {
  keywords: every([
    isRequired('Empty keywords are not allowed'),
    hasMaxLength(32, 'Every keyword should be shorter than 32 chars')
  ])
}

const { errors } = validate(data, rules)

/*
errors = {
  keywords: {
    '0': [ null, null ],
    '1': [ null, null ],
    '2': [ 'Empty keywords are not allowed', null ],
    '3': [ null, 'Every keyword should be shorter than 32 chars' ]
  }
}
*/
```

You can also combine it with `validBy` method to validate a list of objects

```typescript
const data = {
  jobPositions: [
    {
      position: '...',
      company: '...',
      startDate: '...',
      endDate: '...'
    },
    {
      position: '...',
      company: '...',
      startDate: '...',
      endDate: '...'
    },

    // ...
  ]
}

const jobPositionRules = {
  position: [isRequired()],
  startDate: [isRequired()]
}

const rules = {
  jobPosition: [every([validBy(jobPositionRules)])]
}
```
