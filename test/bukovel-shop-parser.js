import test from 'ava'
import pify from 'pify'
import { readFile } from 'fs'

import { parse } from '../src/server/parsers/bukovel-shop'

test('should parse response', t => {
  // Arrange
  return pify(readFile)('fixtures/bukovel_response.json', 'utf8')
    .then(JSON.parse)
    // Act
    .then(parse)
    // Assert
    .then(data => {
      t.is(data.name, '1 День (ДОР)')
      t.is(data.cardNumber, '01-2167-13-185238')
      t.is(data.lifts.length, 14)
    })
})
