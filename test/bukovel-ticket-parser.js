import test from 'ava'
import pify from 'pify'
import { readFile } from 'fs'

import { parseCardNumber } from '../src/server/parsers/bukovel-ticket'

test('should parse card number from response', t => {
  // Arrange
  return pify(readFile)('fixtures/bukovel-ticket-response.html', 'utf8')
    // Act
    .then(parseCardNumber)
    // Assert
    .then(cardNumber => {
      t.is(cardNumber, '16147133534535310476')
    })
})

test('should throw error in case not valid data passed', t => {
  // Arrange
  const invalidData = [ '--', 321, {}, null, undefined, '<html>' ]

  // Act
  invalidData.forEach(data => {
    // Assert
    t.throws(parseCardNumber(data))
  })
})
