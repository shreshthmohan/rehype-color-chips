# Publishing to NPM

This guide walks through the steps to publish a new version of `rehype-color-chips` to npm.

## Pre-publishing Checklist

- [ ] All changes are committed to git
- [ ] Tests pass (`npm test`)
- [ ] README is up to date
- [ ] You're on the correct branch (usually `main`)
- [ ] You're logged in to npm (`npm whoami` to check)

## Publishing Steps

### 1. Login to npm (if not already logged in)

```bash
npm login
```

Enter your npm credentials when prompted.

### 2. Verify you're logged in

```bash
npm whoami
```

Should display your npm username.

### 3. Update version number

The version is currently set to `0.1.4` in `package.json`.

Choose the appropriate version bump based on [semantic versioning](https://semver.org/):

- **Patch** (0.1.4 → 0.1.5): Bug fixes, minor changes
- **Minor** (0.1.4 → 0.2.0): New features (like the `location` option), backward compatible
- **Major** (0.1.4 → 1.0.0): Breaking changes

For the `location` option feature, a **minor** version bump is recommended:

```bash
npm version minor
```

Or manually update the version in `package.json` to `0.2.0`.

### 4. Build the package

```bash
npm run build
```

This will:
- Compile TypeScript (`src/` → `esm/`)
- Generate CommonJS version (`esm/` → `cjs/`)
- Create browser bundles (`es.js` and `index.js`)

### 5. Verify the build

Check that the following directories/files exist:
- `esm/index.js` and `esm/index.d.ts`
- `cjs/index.js`
- `es.js`
- `index.js`

### 6. Test the package locally (optional)

```bash
npm pack
```

This creates a `.tgz` file that you can inspect or install locally for testing:

```bash
npm install ./rehype-color-chips-0.2.0.tgz
```

### 7. Publish to npm

For a regular release:

```bash
npm publish
```

For a pre-release (beta, alpha, etc.):

```bash
npm publish --tag beta
```

### 8. Push changes to GitHub

If you used `npm version`, it created a git commit and tag. Push both:

```bash
git push && git push --tags
```

If you manually updated the version, commit and push:

```bash
git add package.json
git commit -m "Bump version to 0.2.0"
git push
```

### 9. Create a GitHub Release (optional but recommended)

1. Go to https://github.com/shreshthmohan/rehype-color-chips/releases/new
2. Select the tag (e.g., `v0.2.0`)
3. Add release notes describing the changes
4. Publish release

## Post-Publishing

### Verify the package

1. Check npm: https://www.npmjs.com/package/rehype-color-chips
2. Install in a test project: `npm install rehype-color-chips@latest`
3. Verify the new version appears

### Update documentation

If you created a GitHub release, link to it in future references.

## Troubleshooting

### "You do not have permission to publish"

Make sure you're logged in to the correct npm account that has publish permissions for this package.

### "Version already exists"

You need to bump the version number. Each publish must have a unique version.

### Build errors

Make sure all dependencies are installed:

```bash
npm install
```

Then try building again.

## Quick Reference

```bash
# Complete publish workflow
npm whoami                    # Verify logged in
npm version minor             # Bump version
npm run build                 # Build package
npm publish                   # Publish to npm
git push && git push --tags   # Push to GitHub
```
