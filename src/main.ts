import {setOutput, debug, notice} from '@actions/core'
import {getOctokit} from '@actions/github'
import Tag from './tag'
import {
  parseDraft,
  parseDryRun,
  parsePrerelease,
  prereleasePattern,
  tag as rawTag,
  token
} from './config'
import isPrerelease from './is-prerelease'

async function run(): Promise<void> {
  debug(`Tag: ${rawTag}`)

  const tag = new Tag(rawTag)

  const [name, body] = await Promise.all([tag.getSubject(), tag.getBody()])
  debug(`Release Name: ${name}`)
  setOutput('title', name)
  debug(`Release Body: ${body}`)
  setOutput('body', body)

  const draft = parseDraft()
  debug(`Draft: ${draft}`)

  const [owner, repo] = process.env.GITHUB_REPOSITORY?.split('/') ?? ['', '']
  debug(`Owner: ${owner}`)
  debug(`Repo: ${repo}`)

  const prerelease = isPrerelease(parsePrerelease(), rawTag, prereleasePattern)

  if (prerelease) {
    debug('Detected prerelease')
  }

  setOutput('prerelease', prerelease)

  if (parseDryRun()) {
    notice('Dry run, skipping release creation', {title: 'Dry Run'})
    return
  }

  // NOTE Docs: https://octokit.github.io/rest.js/v18#repos-create-release
  const octokit = getOctokit(token)
  await octokit.rest.repos.createRelease({
    owner,
    repo,
    tag_name: rawTag,
    name,
    body,
    prerelease,
    draft
  })
}

run()
