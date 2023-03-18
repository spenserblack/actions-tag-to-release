import {exec} from '@actions/exec'

export default class Tag {
  constructor(public tag: string) {}

  async getSubject(): Promise<string> {
    return await this.getContents('subject')
  }

  async getBody(): Promise<string> {
    return await this.getContents('body')
  }

  async getContents(filter: string): Promise<string>
  async getContents(filter: string[]): Promise<string[]>
  async getContents(
    filter: string | string[] = ''
  ): Promise<string | string[]> {
    if (typeof filter !== 'string') {
      return await Promise.all(filter.map(async f => await this.getContents(f)))
    }

    let output = ''
    let error = ''

    await exec(
      'git',
      ['tag', '-l', `--format=%(contents:${filter})`, this.tag],
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

    return output.replace(/(\r?\n)+$/, '')
  }
}
