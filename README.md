# Tag to Release

[![Node.js CI](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/ci.yml/badge.svg)](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/ci.yml)
[![Check dist/](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/check-dist.yml/badge.svg)](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/check-dist.yml)

Generate a GitHub release using an annotated tag for the title and release
notes

## Example

### Tag

```bash
git tag -a v1.0.0 -m "Initial Release

Added
-----

- Initial version of tool
"

git push origin v1.0.0
```

### Workflow Code

```yaml
name: Release

on:
  push:
    tags: ['v*.*.*']

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: actions/checkout@v2
        with:
          ref: ${{ github.ref }}
      - uses: spenserblack/actions-tag-to-release@master
```

## Inputs

|    key    |         default          |                                      description                                       |
| :-------: | :----------------------: | :------------------------------------------------------------------------------------: |
|   `tag`   | `${{ github.ref_name }}` |      The annotated tag for the release, containing the release's title and notes.      |
|  `token`  |  `${{ github.token }}`   |                     The GitHub token to use to create the release.                     |
|  `draft`  |         `false`          |                     Creates the release as a draft if set to true.                     |
| `dry-run` |         `false`          | Use this to prevent a release from being created. Useful if you only need the outputs. |

## Outputs

|   key   |                                      description                                       |
| :-----: | :------------------------------------------------------------------------------------: |
| `title` |                     The first line of the annotated tag's message                      |
| `body`  | All other lines after the second line (like a commit, the second line should be blank) |
