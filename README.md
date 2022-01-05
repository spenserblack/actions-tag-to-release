# Tag to Release

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
    tags: [ 'v*.*.*' ]

jobs:
  release:
    runs-on: ubuntu-latest
    permissions:
      contents: write
    steps:
      - uses: spenserblack/actions-tag-to-release@master
```
