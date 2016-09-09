import test from 'ava'
import pify from 'pify'
import has from 'lodash.has'
import { readFile } from 'fs'

import { parseSkipass } from '../src/server/parsers/bukovel-shop'

test('should parse response', t => {
  // Arrange
  return pify(readFile)('fixtures/bukovel_response.json', 'utf8')
    .then(JSON.parse)
    // Act
    .then(parseSkipass)
    // Assert
    .then(data => {
      t.is(data.name, '1 День (ДОР)')
      t.is(data.cardNumber, '01-2167-13-185238')
      t.is(data.lifts.length, 14)
    })
})

test('in case of error response parser should return array of errors values', t => {
  // Arrange
  const error1Message1 = 'error_1 message'
  const error2Message2 = 'error_2 message'
  const data = {
    error: {
      '1': error1Message1,
      '2': error2Message2
    }
  }

  // Act
  const parsedData = parseSkipass(data)

  // Assert
  t.true(has(parsedData, 'errors'))
  t.true(Array.isArray(parsedData.errors))
  t.deepEqual(parsedData.errors, [error1Message1, error2Message2])
})
