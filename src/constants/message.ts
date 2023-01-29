export const PUNCTUATION = {
  SEMICOLON: ';',
}

export const ERROR_MESSAGE = {
  REQUIRED: (label: string) => `${label} can't be blank`,
  EXIST: (label: string) => `${label} already exists`,
  NOT_EXIST: (label: string) => `${label} is not exist`,
  INVALID: (label: string) => `${label} is invalid`,
  MIN_LENGTH: (label: string, length: number) => `${label} is too short (minimum is ${length} characters)`,
  MAX_LENGTH: (label: string, length: number) => `${label} is too long (maximum is ${length} characters)`,
} as const
