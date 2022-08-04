import {exec} from '@actions/exec'

export default class Tag {
  constructor(public tag: string) {}

  async getSubject(): Promise<string> {
    return (await this.getTagContents('subject')).replace(/\r?\n$/, '')
  }

  async getBody(): Promise<string> {
    return await this.getTagContents('body')
  }

  private async getTagContents(contents: string): Promise<string> {
    let output = ''
    let error = ''

    await exec(
      'git',
      ['tag', '-l', `--format=%(contents:${contents})`, this.tag],
      {
        listeners: {
          stdout: (data: Buffer) => {
            output = data.toString()
          },
          stderr: (data: Buffer) => {
            error = data.toString()
          }
        }
      }
    )

    if (error) {
      throw new Error(error)
    }

    return output
  }
}
