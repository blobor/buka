import test from 'ava'
import pify from 'pify'
import { join } from 'path'
import { readFile } from 'fs'

import { parseCardNumber, parseSkipass } from '../src/server/parsers/bukovel-ticket'

test('should parse card number from response', t => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel-ticket-cardnumber-response.html')

  return pify(readFile)(filePath, 'utf8')
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

test('should parse skipass from response', t => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel-ticket-skipass-responce.html')

  return pify(readFile)(filePath, 'utf8')
    // Act
    .then(parseSkipass)
    // Assert
    .then(data => {
      t.is(data.name, '5 днів СЕЗОН (ВСЕF)')
      t.is(data.cardNumber, '01-2167-30-92545')
      t.is(data.ticketNumber, '01-1614 7133 5345 3531 0476-4')
      t.is(data.lifts.length, 33)
    })
})

test('should parse skipass from response', t => {
  // Arrange
  const filePath = join(__dirname, 'fixtures/bukovel-ticket-skipass-responce--with-date.html')

  return pify(readFile)(filePath, 'utf8')
    // Act
    .then(parseSkipass)
    // Assert
    .then(data => {
      t.is(data.name, '5 днів СЕЗОН (ВСЕF)')
      t.is(data.cardNumber, '01-2167-30-92545')
      t.is(data.ticketNumber, '01-1614 7133 5345 3531 0476-4')
      t.is(data.lifts.length, 33)
    })
})
