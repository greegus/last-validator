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
import { validate } from 'last-validator'
import { isRequired } from 'last-validator/validators/isRequired'
import { isValidEmail } from 'last-validator/validators/isValidEmail'
import { hasMinValue } from 'last-validator/validators/hasMinValue'

const data = {
  fullName: 'Too Young',
  address: ''
  age: 12
  email: 'email(at)me.com'
}

const rules = {
  fullName: [ isRequired() ],
  address: [ isRequired('Address is required') ],
  age: [ isRequired(), hasMinValue(15, "*Sigh*, you're too young to drive this thing!") ],
  email: [ isValidEmail() ]
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
import { validateAll } from 'last-validator'
import { isRequired } from 'last-validator/validators/isRequired'

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
  endDate: [hasMaxValue(job.startDate)]

  // ...
})
```

## Build-in validators

- `isRequired(errorMessage?: string)`
- `isNumeric(errorMessage?: string)`
- `hasMinValue(minValue: number, errorMessage?: string)`
- `hasMaxValue(maxValue: number, errorMessage?: string)`
- `hasMaxLength(maxLength: number, errorMessage?: string)`
- `isValidEmail(errorMessage?: string)`

## Custom validators

```typescript
import { Validator } from 'last-validator'

const isValidAddress: Validator = async ({ value, resolve, reject }) => {
  const result = await validateAddressOnBackend(value)
  result ? resolve() : reject('Invalid address')
}

const address = { ... }
const { isValid, errors } = await validate({ address }, { address: [isValidAddress] })
```
