const CARD_NUMBER_PATTERN = '^\\d{2}-\\d{4}-\\d{2}-\\d{4,}$'
const CARD_NUMBER_REGEX = new RegExp(CARD_NUMBER_PATTERN)
const validate = value => CARD_NUMBER_REGEX.test(value)

export {
  validate,
  CARD_NUMBER_REGEX,
  CARD_NUMBER_PATTERN
}
