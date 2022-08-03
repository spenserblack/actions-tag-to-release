import {getBooleanInput, getInput} from '@actions/core'

export const tag: string = getInput('tag')
export const token: string = getInput('token')
export const dryRun: boolean = getBooleanInput('dry-run')

export function parseDraft(): boolean {
  const input = getInput('draft')
  switch (input) {
    case 'true':
    case 'True':
    case 'TRUE':
      return true
    case 'false':
    case 'False':
    case 'FALSE':
      return false
    default:
      throw new Error(`Invalid draft value: ${input}`)
  }
}
