import test from 'ava'
import pify from 'pify'
import { readFile } from 'fs'

import { parseCardNumber } from '../src/server/parsers/bukovel-ticket'

test('should parse response', t => {
  // Arrange
  return pify(readFile)('fixtures/bukovel-ticket-response.html', 'utf8')
    // Act
    .then(parseCardNumber)
    // Assert
    .then(cardNumber => {
      t.is(cardNumber, '16147133534535310476')
    })
})
