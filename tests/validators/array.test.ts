import { validate, some, every, test as inlineTest } from '../../dist/index'

describe('#every', () => {
  it('validates every object-like item', async () => {
    const data = {
      orderedBewerages: [
        { name: 'beer', isAlcoholic: false },
        { name: 'soda', isAlcoholic: true },
        { name: 'juice', isAlcoholic: false }
      ]
    }

    const rules = {
      orderedBewerages: [every([
        inlineTest(() => true),
        inlineTest((value) => !value.isAlcoholic, 'Error message'),
        inlineTest(() => true)
      ])]
    }

    const { isValid, errors } = await validate(data, rules)

    expect(isValid).toBe(false)
    expect(errors.orderedBewerages).toStrictEqual([{
      '0': [ undefined, undefined, undefined ],
      '1': [ undefined, 'Error message', undefined ],
      '2': [ undefined, undefined, undefined ]
    }])
  })
})

describe('#some', () => {
  it('validates some object-like item', async () => {
    const data = {
      orderedBewerages: [
        { name: 'beer', isAlcoholic: false },
        { name: 'soda', isAlcoholic: true },
        { name: 'juice', isAlcoholic: false }
      ]
    }

    const rules = {
      orderedBewerages: [some([inlineTest((value) => !value.isAlcoholic, 'Error message')])]
    }

    const { isValid, errors } = await validate(data, rules)

    expect(isValid).toBe(true)
    expect(errors.orderedBewerages).toBeUndefined
  })
})
