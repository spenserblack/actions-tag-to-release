import {describe, expect, test} from '@jest/globals'
import isPrerelease from '../src/is-prerelease'

describe('isPrerelease', () => {
  const options: [tag: string, pattern: string, match: boolean][] = [
    ['v1.0.0-alpha', 'v*.*.*-*', true],
    ['v1.0.0-rc', 'v*.*.*-*', true],
    ['v1.0.0-alpha.1', 'v*.*.*-*', true],
    ['v1.0.0', 'v*.*.*-*', false],
    ['v1-rc', 'v*.*.*-*', false],
    ['foo', 'v*.*.*-*', false],
    ['foo-prerelease', '*-prerelease', true],
  ];

  test.each(options)('isPrerelease(true, %s, %s) is true', (tag: string, pattern: string) => {
    expect(isPrerelease(true, tag, pattern)).toBe(true)
  })

  test.each(options)('isPrerelease(false, %s, %s) is false', (tag: string, pattern: string) => {
    expect(isPrerelease(false, tag, pattern)).toBe(false)
  })

  test.each(options)('isPrerelease("auto", %s, %s) is %p', (tag: string, pattern: string, match: boolean) => {
    expect(isPrerelease('auto', tag, pattern)).toBe(match)
  })
});
