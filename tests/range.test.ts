import { expect, test, describe } from 'vitest'

import { handleBits, handleBytes } from '../src/range.js'

describe('range sub-command', () => {
  describe('handleBits function', () => {
    describe('given a valid argument', () => {
      test('with number input', () => {
        expect(handleBits({ bits: '8' })).toBe('0 <-> 255')
        expect(handleBits({ bits: '-8' })).toBe('-128 <-> 127')
      })

      test('with locale', () => {
        expect(handleBits({ bits: '16' })).toBe('0 <-> 65,535')
        expect(handleBits({ bits: '16', locale: 'fr-FR' })).toBe(
          '0 <-> 65\u202f535',
        )
        expect(handleBits({ bits: '-16' })).toBe('-32,768 <-> 32,767')
        expect(handleBits({ bits: '-16', locale: 'fr-FR' })).toBe(
          '-32\u202f768 <-> 32\u202f767',
        )
      })
    })

    describe('given an invalid argument', () => {
      test('with a string input', () => {
        expect(handleBits({ bits: 'abc' })).toBe('input must be a number')
      })

      test('with wrong locale input of length = 1', () => {
        expect(handleBits({ bits: '8', locale: 'a' })).toBe(
          'Incorrect locale information provided',
        )
      })

      test('with wrong locale input of length > 8', () => {
        expect(handleBits({ bits: '8', locale: 'abcdefghi' })).toBe(
          'Incorrect locale information provided',
        )
      })
    })
  })

  describe('handleBytes function', () => {
    describe('given a valid argument', () => {
      test('with number input', () => {
        expect(handleBytes({ bytes: '1' })).toBe('0 <-> 255')
        expect(handleBytes({ bytes: '-1' })).toBe('-128 <-> 127')
      })

      test('with locale', () => {
        expect(handleBytes({ bytes: '2' })).toBe('0 <-> 65,535')
        expect(handleBytes({ bytes: '2', locale: 'fr-FR' })).toBe(
          '0 <-> 65\u202f535',
        )
        expect(handleBytes({ bytes: '-2' })).toBe('-32,768 <-> 32,767')
        expect(handleBytes({ bytes: '-2', locale: 'fr-FR' })).toBe(
          '-32\u202f768 <-> 32\u202f767',
        )
      })
    })

    describe('given an invalid argument', () => {
      test('with a string input', () => {
        expect(handleBytes({ bytes: 'abc' })).toBe('input must be a number')
      })

      test('with locale input of length = 1', () => {
        expect(handleBytes({ bytes: '2', locale: 'a' })).toBe(
          'Incorrect locale information provided',
        )
      })

      test('with locale input of length > 8', () => {
        expect(handleBytes({ bytes: '2', locale: 'abcdefghi' })).toBe(
          'Incorrect locale information provided',
        )
      })
    })
  })
})
