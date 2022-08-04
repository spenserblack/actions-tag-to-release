import {describe, expect, test} from '@jest/globals'
import {parseDraft, parsePrerelease} from '../src/config'

describe('config', () => {
  describe('parseDraft', () => {
    test.each(['true', 'True', 'TRUE'])('%s should be true', input => {
      process.env.INPUT_DRAFT = input
      expect(parseDraft()).toBe(true)
    })

    test.each(['false', 'False', 'FALSE'])('%s should be false', input => {
      process.env.INPUT_DRAFT = input
      expect(parseDraft()).toBe(false)
    })

    test('throws invalid value', () => {
      process.env.INPUT_DRAFT = 'foo'
      expect(parseDraft).toThrow('Invalid draft value: foo')
    })
  })

  describe('parsePrerelease', () => {
    test.each(['true', 'True', 'TRUE', 'always'])(
      '%s should be true',
      input => {
        process.env.INPUT_PRERELEASE = input
        expect(parsePrerelease()).toBe(true)
      }
    )

    test.each(['false', 'False', 'FALSE', 'never'])(
      '%s should be false',
      input => {
        process.env.INPUT_PRERELEASE = input
        expect(parsePrerelease()).toBe(false)
      }
    )

    test('auto is auto', () => {
      process.env.INPUT_PRERELEASE = 'auto'
      expect(parsePrerelease()).toBe('auto')
    })

    test('throws invalid value', () => {
      process.env.INPUT_PRERELEASE = 'foo'
      expect(parsePrerelease).toThrow('Invalid prerelease value: foo')
    })
  })
})
