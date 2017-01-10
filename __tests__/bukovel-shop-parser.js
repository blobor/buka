import pify from 'pify'
import has from 'lodash.has'
import { join } from 'path'
import { readFile } from 'fs'

import { parseSkipass } from '../src/server/parsers/bukovel-shop'

it('should parse response', () => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel_response.json')

  return pify(readFile)(filePath, 'utf8')
    .then(JSON.parse)
    // Act
    .then(parseSkipass)
    // Assert
    .then(data => {
      expect(data.name).toBe('1 День (ДОР)')
      expect(data.cardNumber).toBe('01-2167-13-185238')
      expect(data.lifts.length).toBe(14)
    })
})

it('in case of error response parser should return array of errors values', () => {
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
  expect(has(parsedData, 'errors')).toBe(true)
  expect(Array.isArray(parsedData.errors)).toBe(true)
  expect(parsedData.errors).toEqual([error1Message1, error2Message2])
})
