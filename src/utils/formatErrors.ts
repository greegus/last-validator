import { ValidationErrors } from "../types"

export function formatErrors(errors: boolean | string | ValidationErrors | (boolean | string | ValidationErrors)[], includeNested?: boolean): string | true | undefined {
  const flattedErrors: (string | true)[] = Array.isArray(errors) ? errors : [errors]
    .reduce((accumulator, error) => includeNested ? [...accumulator, formatErrors(error, includeNested)] : includeNested, [] as any)
    .filter(Boolean)

  if (flattedErrors.length === 0) {
    return
  }

  return flattedErrors.filter(error => typeof error === 'string').join('. ') || true
}
