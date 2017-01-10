import pify from 'pify'
import { join } from 'path'
import { readFile } from 'fs'

import { parseCardNumber, parseSkipass } from '../src/server/parsers/bukovel-ticket'

it('should parse card number from response', () => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel-ticket-cardnumber-response.html')

  return pify(readFile)(filePath, 'utf8')
    // Act
    .then(parseCardNumber)
    // Assert
    .then(cardNumber => {
      expect(cardNumber).toBe('16147133534535310476')
    })
})

// ToDo: check https://github.com/facebook/jest/issues/1377
it.skip('should reject in case not valid data passed', () => {
  // Arrange
  const invalidData = [ '--', 321, {}, null, undefined, '<html>' ]

  // Act
  invalidData.forEach(data => {
    // Assert
    expect(parseCardNumber(data)).toThrow()
  })
})

it('should parse skipass from response', () => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel-ticket-skipass-responce.html')

  return pify(readFile)(filePath, 'utf8')
    // Act
    .then(parseSkipass)
    // Assert
    .then(data => {
      expect(data.name).toBe('5 днів СЕЗОН (ВСЕF)')
      expect(data.cardNumber).toBe('01-2167-30-92545')
      expect(data.ticketNumber).toBe('01-1614 7133 5345 3531 0476-4')
      expect(data.lifts.length).toBe(33)
    })
})

it('should parse skipass from response', () => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel-ticket-skipass-responce--with-date.html')

  return pify(readFile)(filePath, 'utf8')
    // Act
    .then(parseSkipass)
    // Assert
    .then(data => {
      expect(data.name).toBe('5 днів СЕЗОН (ВСЕF)')
      expect(data.cardNumber).toBe('01-2167-30-92545')
      expect(data.ticketNumber).toBe('01-1614 7133 5345 3531 0476-4')
      expect(data.lifts.length).toBe(33)
    })
})
