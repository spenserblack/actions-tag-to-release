# Tag to Release

Generate a GitHub release using an annotated tag for the title and release
notes

## Example

```yaml
name: Release

on:
  push:
    tags: [ 'v*.*.*' ]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
  steps:
    - uses: spenserblack/actions-tag-to-release@master
```
