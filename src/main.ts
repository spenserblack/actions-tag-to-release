import {getInput, setOutput, debug} from '@actions/core'
import {getOctokit} from '@actions/github'
import Tag from './tag'

async function run(): Promise<void> {
  const rawTag: string = getInput('tag')
  debug(`Tag: ${rawTag}`)

  const tag = new Tag(rawTag)
  const token: string = getInput('token')

  const [name, body] = await Promise.all([tag.getSubject(), tag.getBody()])
  debug(`Release Name: ${name}`)
  setOutput('title', name)
  debug(`Release Body: ${body}`)
  setOutput('body', body)

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
    body
  })
}

run()
