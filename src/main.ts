import {setOutput, debug} from '@actions/core'
import {getOctokit} from '@actions/github'
import Tag from './tag'
import {parseDraft, tag as rawTag, token} from './config'

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

  // NOTE Docs: https://octokit.github.io/rest.js/v18#repos-create-release
  const octokit = getOctokit(token)
  await octokit.rest.repos.createRelease({
    owner,
    repo,
    tag_name: rawTag,
    name,
    body,
    draft
  })
}

run()
