# Contributing to slottify

Thank you for your interest in contributing to slottify! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Pull Request Process](#pull-request-process)
- [Code Style](#code-style)
- [Documentation](#documentation)

## Code of Conduct

This project is committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and considerate in all interactions.

## Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 8
- Git

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/slottify.git
   cd slottify
   ```
3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/dsfcoll/slottify.git
   ```

## Development Setup

### Install Dependencies

```bash
npm install
```

### Build the Project

```bash
npm run build
```

### Development Mode

For development with watch mode:

```bash
npm run dev
```

## Making Changes

### Creating a Feature Branch

Always create a new branch for your changes:

```bash
git checkout -b feature/your-feature-name
```

Or for bug fixes:

```bash
git checkout -b fix/your-bug-description
```

### Making Your Changes

1. **Follow the existing code style** (see [Code Style](#code-style))
2. **Write tests** for new functionality
3. **Update documentation** if needed
4. **Keep commits atomic** - one logical change per commit

### Commit Messages

Use conventional commit format:

```
type(scope): description

[optional body]

[optional footer]
```

Examples:
- `feat(filters): add reverse filter`
- `fix(parser): handle edge case in ternary expressions`
- `docs(readme): update installation instructions`
- `test(engine): add tests for custom filters`

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

## Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run coverage

# Run tests in debug mode
npm run test:debug

# Run tests in watch mode
npm test -- --watch
```

### Writing Tests

- Tests should be in `.spec.ts` files alongside the source code
- Use descriptive test names
- Test both success and error cases
- Test edge cases and boundary conditions

Example test structure:

```typescript
describe('TemplateEngine', () => {
  let engine: TemplateEngine;

  beforeEach(() => {
    engine = new TemplateEngine();
  });

  describe('Feature Name', () => {
    it('should handle normal case', () => {
      const result = engine.render('{{ variable }}', { variable: 'value' });
      expect(result).toBe('value');
    });

    it('should handle edge case', () => {
      const result = engine.render('{{ variable }}', {});
      expect(result).toBe('');
    });

    it('should throw error for invalid input', () => {
      expect(() => {
        engine.render('{{ variable | unknown }}', { variable: 'value' });
      }).toThrow('Unknown filter: unknown');
    });
  });
});
```

## Pull Request Process

### Before Submitting

1. **Ensure tests pass**:
   ```bash
   npm test
   npm run coverage
   ```

2. **Check code style**:
   ```bash
   npm run lint:fix
   ```

3. **Build the project**:
   ```bash
   npm run build
   ```

4. **Update documentation** if your changes affect the public API

5. **Update CHANGELOG.md** with your changes under the [Unreleased] section

### Submitting a Pull Request

1. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create a Pull Request on GitHub

3. Fill out the PR template with:
   - Description of changes
   - Related issue (if any)
   - Testing performed
   - Breaking changes (if any)

4. Request review from maintainers

### PR Review Process

- All PRs require at least one review
- Address review comments promptly
- Keep the PR focused and manageable in size
- Update the PR if requested changes are made

## Code Style

### TypeScript

- Use TypeScript for all new code
- Prefer interfaces over types for object shapes
- Use explicit return types for public methods
- Use `any` sparingly, prefer `unknown` when type is truly unknown

### Naming Conventions

- **Classes**: PascalCase (`TemplateEngine`)
- **Functions/Methods**: camelCase (`render`, `addFilter`)
- **Variables**: camelCase (`template`, `context`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_FILTER_ARGS`)
- **Interfaces**: PascalCase with descriptive names (`TemplateNode`)

### Code Organization

- Keep functions small and focused
- Use meaningful variable names
- Add comments for complex logic
- Group related functionality together

### Error Handling

- Use descriptive error messages
- Throw errors for invalid inputs
- Handle edge cases gracefully
- Log errors for debugging when appropriate

## Documentation

### Code Documentation

- Add JSDoc comments for public methods
- Include parameter types and return types
- Provide usage examples for complex methods

Example:

```typescript
/**
 * Renders a template string with the provided context.
 * 
 * @param template - The template string to render
 * @param context - Optional context object containing variables
 * @returns The rendered template string
 * 
 * @example
 * ```javascript
 * const engine = new TemplateEngine();
 * const result = engine.render('Hello {{ name }}!', { name: 'World' });
 * // Returns: "Hello World!"
 * ```
 */
render(template: string, context?: Record<string, any>): string {
  // Implementation...
}
```

### Documentation Updates

When making changes that affect the public API:

1. Update README.md with new features/examples
2. Update API.md with detailed documentation
3. Add migration notes if breaking changes
4. Update CHANGELOG.md

## Release Process

### For Maintainers

1. **Update version** in `package.json`
2. **Update CHANGELOG.md**:
   - Move [Unreleased] content to new version
   - Update release date
3. **Create release tag**:
   ```bash
   git tag v0.1.5
   git push origin v0.1.5
   ```
4. **Publish to npm**:
   ```bash
   npm publish
   ```

### Release Checklist

- [ ] All tests pass
- [ ] Documentation is up to date
- [ ] CHANGELOG.md is updated
- [ ] Version is bumped in package.json
- [ ] Release is tagged
- [ ] Package is published to npm

## Getting Help

- **Issues**: Use GitHub Issues for bug reports and feature requests
- **Discussions**: Use GitHub Discussions for questions and general discussion
- **Security**: Report security issues privately to maintainers

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- CHANGELOG.md for significant contributions
- README.md for major contributors

Thank you for contributing to slottify! 🧩 