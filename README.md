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
  fullName: 'Too Young',
  address: ''
  age: 12
  email: 'invalid_email_format(at)me.com'
}

const rules = {
  fullName: [ isRequired() ],
  address: [ isRequired('Address is required') ],
  age: [ isRequired(), isGreaterOrEqualThan(15, "*Sigh*, you're too young to drive this thing!") ],
  email: [ isEmail() ]
}

const { isValid, errors } = await validate(data, rules)

/*
  isValid: false
  errors: {
    address: 'Address is required',
    age: '*Sigh*, you're too young to drive this thing!',
    email: true
  }
*/
```

### Validate arrays

```typescript
import { validateAll, isRequired } from 'last-validator'

const jobPositions = [
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

const rules = {
  position: [isRequired()],
  startDate: [isRequired()]
}

const { isValid, errors } = await validateAll(jobPositions, rules)
```

If you need to adjust the rules dynamically, you can just pass a function that will generate them


```typescript
const rules = (job) => ({
  endDate: [isLessOrEqualThan(job.startDate)]

  // ...
})
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

## Custom validators

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

### Default error messages

You can use `setDefaultErrorMessages` to set a default error message for each built-in validator.

```typescript
import { setDefaultErrorMessages } from 'last-validator'

setDefaultErrorMessages({
  isRequired: 'Field is required.',
  ...
})
```
