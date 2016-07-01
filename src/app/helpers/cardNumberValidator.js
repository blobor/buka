const CARD_NUMBER_REGEX = /^\d{2}\-\d{4}\-\d{2}\-\d{4,}$/
const validate = value => CARD_NUMBER_REGEX.test(value)

export {
  validate,
  CARD_NUMBER_REGEX
}
