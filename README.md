# Tag to Release

[![Node.js CI](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/ci.yml/badge.svg)](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/ci.yml)
[![Check dist/](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/check-dist.yml/badge.svg)](https://github.com/spenserblack/actions-tag-to-release/actions/workflows/check-dist.yml)
[![codecov](https://codecov.io/gh/spenserblack/actions-tag-to-release/branch/master/graph/badge.svg?token=abEvixe4s0)](https://codecov.io/gh/spenserblack/actions-tag-to-release)

Generate a GitHub release using an annotated tag for the title and release
notes

Pairs well with [`release.sh`][release-sh].

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
      - uses: actions/checkout@v3
        with:
          ref: ${{ github.ref }}
      - uses: spenserblack/actions-tag-to-release@master
```

## Inputs

|         key          |         default          |              possible values               |                                                            description                                                             |
| :------------------: | :----------------------: | :----------------------------------------: | :--------------------------------------------------------------------------------------------------------------------------------: |
|        `tag`         | `${{ github.ref_name }}` |                any tag name                |                            The annotated tag for the release, containing the release's title and notes.                            |
|       `token`        |  `${{ github.token }}`   |              any valid token               |                                           The GitHub token to use to create the release.                                           |
|       `draft`        |         `false`          |              `true`, `false`               |                                           Creates the release as a draft if set to true.                                           |
|      `dry-run`       |         `false`          |              `true`, `false`               |                       Use this to prevent a release from being created. Useful if you only need the outputs.                       |
|     `prerelease`     |         `false`          | `true`, `false`, `always`, `never`, `auto` | Set `true` to always create a prerelease. Set to `auto` to create a prerelease when the tag matches the prerelease pattern (below) |
| `prerelease-pattern` |        `v*.*.*-*`        |          See [minimatch] patterns          |                                         Pattern to match to the tag to detect a prerelease                                         |

## Outputs

|     key      |                                      description                                       |
| :----------: | :------------------------------------------------------------------------------------: |
|   `title`    |                     The first line of the annotated tag's message                      |
|    `body`    | All other lines after the second line (like a commit, the second line should be blank) |
| `prerelease` |                          If the workflow created a prerelease                          |

[minimatch]: https://www.npmjs.com/package/minimatch
[release-sh]: https://github.com/spenserblack/release.sh
