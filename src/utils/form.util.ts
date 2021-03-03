import { lowerCase, upperFirst } from 'lodash'
import { ERROR_MESSAGE, PUNCTUATION } from 'src/constants/message'

export function focusErrorField (): void {
  setTimeout(() => {
    const firstErrorField = document.querySelector('.error.field')

    firstErrorField?.querySelector('input')?.focus()
  })
}

export type FormExceptionKey =
  | 'isNotEmpty'
  | 'isExist'
  | 'isNotExist'
  | 'isInvalid'

export const fieldErrorSeparator = `${PUNCTUATION.SEMICOLON}\n`

export function fieldErrorDecorator (field: string, errors: FormExceptionKey[]): string {
  const errorMap: Record<FormExceptionKey, (field: string, ...args: unknown[]) => string> = {
    isNotEmpty: ERROR_MESSAGE.REQUIRED,
    isExist: ERROR_MESSAGE.EXIST,
    isNotExist: ERROR_MESSAGE.NOT_EXIST,
    isInvalid: ERROR_MESSAGE.INVALID,
  }
  const messages = errors.map(error => errorMap[error](field))
  return messages.join(fieldErrorSeparator)
}

export function sentence (text: string): string {
  return upperFirst(text.replace(/\b(\w+)\b/g, lowerCase))
}
