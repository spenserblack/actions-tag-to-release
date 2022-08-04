import minimatch from 'minimatch'
import type {PrereleaseConfig} from './config'

export default function isPrerelease(
  config: PrereleaseConfig,
  tag: string,
  pattern: string
): boolean {
  if (typeof config === 'boolean') return config
  return minimatch(tag, pattern)
}
