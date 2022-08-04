import {getBooleanInput, getInput} from '@actions/core'

export type PrereleaseConfig = boolean | 'auto';

export const tag: string = getInput('tag')
export const token: string = getInput('token')
export const prereleasePattern: string = getInput('prerelease-pattern')

export function parseDraft(): boolean {
  const input = getInput('draft')
  const val = inputAsBoolean(input)
  if (val === null) throw new Error(`Invalid draft value: ${input}`)
  return val
}

export function parsePrerelease(): PrereleaseConfig {
  const input = getInput('prerelease')
  if (input === 'auto') return 'auto'
  const val = inputAsBoolean(input)
  if (val === null) throw new Error(`Invalid prerelease value: ${input}`)
  return val
}

export function parseDryRun(): boolean {
  return getBooleanInput('dry-run')
}

/**
 * This is pretty much identical to how getBooleanInput works,
 * but it doesn't throw an error if the input is invalid.
 */
function inputAsBoolean(input: string): boolean | null {
  switch (input) {
    case 'true':
    case 'True':
    case 'TRUE':
    case 'always':
      return true
    case 'false':
    case 'False':
    case 'FALSE':
    case 'never':
      return false
    default:
      return null
  }
}
