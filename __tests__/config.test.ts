import {describe, expect, test} from '@jest/globals'
import {parseDraft} from '../src/config'

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
})
