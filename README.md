# slottify 🧩

A minimal and fast JavaScript template engine with pipe-style modifiers and conditional expressions.

## ✨ Features

- **Easy syntax** with `{{ variable | filter }}` support
- **Lightweight** - no dependencies, ~1.4 KB gzipped
- **Simple JavaScript object-based rendering**
- **Built-in filters**: `lower`, `upper`, `capitalize`, `includes`
- **Custom filters** - add your own filter functions
- **Ternary expressions** - conditional rendering with `{{ condition ? true : false }}`
- **TypeScript support** - full type definitions included

## 🔧 Installation

```bash
npm install slottify
```

## 📖 Quick Start

```javascript
import { TemplateEngine } from 'slottify';

const engine = new TemplateEngine();

// Basic variable substitution
const result = engine.render('Hello {{ name }}!', { name: 'World' });
// Output: Hello World!

// Using filters
const result2 = engine.render('Hello {{ name | upper }}!', { name: 'world' });
// Output: Hello WORLD!

// Ternary expressions
const result3 = engine.render('{{ isActive ? "Online" : "Offline" }}', { isActive: true });
// Output: Online
```

## 🚀 Usage Examples

### Basic Variable Substitution

```javascript
const engine = new TemplateEngine();

// Simple variable
engine.render('Hello {{ name }}!', { name: 'John' });
// Output: Hello John!

// Multiple variables
engine.render('{{ greeting }} {{ name }}!', { 
  greeting: 'Hello', 
  name: 'World' 
});
// Output: Hello World!

// Missing variables return empty string
engine.render('Hello {{ name }}!', {});
// Output: Hello !
```

### Built-in Filters

```javascript
const engine = new TemplateEngine();

// Lowercase
engine.render('{{ text | lower }}', { text: 'HELLO WORLD' });
// Output: hello world

// Uppercase
engine.render('{{ text | upper }}', { text: 'hello world' });
// Output: HELLO WORLD

// Capitalize
engine.render('{{ text | capitalize }}', { text: 'hello world' });
// Output: Hello world

// Includes (with argument)
engine.render('{{ text | includes "world" }}', { text: 'hello world' });
// Output: true

// Chaining filters
engine.render('{{ text | lower | upper }}', { text: 'Hello World' });
// Output: HELLO WORLD
```

### Ternary Expressions

```javascript
const engine = new TemplateEngine();

// Simple ternary
engine.render('{{ isActive ? "Online" : "Offline" }}', { isActive: true });
// Output: Online

// With filters in ternary
engine.render('{{ name ? name | upper : "Anonymous" }}', { name: 'john' });
// Output: JOHN

// Complex ternary with filters
const template = '{{ name | lower | includes "peter" ? "No Peter!" : name }}';
engine.render(template, { name: 'Peter' });
// Output: No Peter!
engine.render(template, { name: 'John' });
// Output: John
```

### Custom Filters

```javascript
const engine = new TemplateEngine();

// Add a custom filter
engine.addFilter('reverse', (value) => {
  return String(value).split('').reverse().join('');
});

engine.render('{{ text | reverse }}', { text: 'hello' });
// Output: olleh

// Filter with multiple arguments
engine.addFilter('replace', (value, search, replace) => {
  return String(value).replace(String(search), String(replace));
});

engine.render('{{ text | replace "world" "universe" }}', { 
  text: 'hello world' 
});
// Output: hello universe

// List available filters
console.log(engine.getFilters());
// Output: ['lower', 'upper', 'capitalize', 'includes', 'reverse', 'replace']
```

### Complex Templates

```javascript
const engine = new TemplateEngine();

const user = {
  name: 'John Doe',
  email: 'john@example.com',
  isActive: true,
  role: 'admin'
};

const template = `
User: {{ name | capitalize }}
Email: {{ email | lower }}
Status: {{ isActive ? "Active" : "Inactive" }}
Role: {{ role | upper }}
{{ role | includes "admin" ? "Administrator access" : "Standard access" }}
`;

const result = engine.render(template, user);
// Output:
// User: John Doe
// Email: john@example.com
// Status: Active
// Role: ADMIN
// Administrator access
```

## 📚 API Reference

### TemplateEngine

The main class for template rendering.

#### Constructor

```javascript
const engine = new TemplateEngine();
```

#### Methods

##### `render(template: string, context?: Record<string, any>): string`

Renders a template string with the provided context.

```javascript
const result = engine.render('Hello {{ name }}!', { name: 'World' });
```

##### `compile(template: string): ASTNode[]`

Compiles a template string into an AST (Abstract Syntax Tree).

```javascript
const ast = engine.compile('Hello {{ name }}!');
```

##### `evaluate(ast: ASTNode[], context?: Record<string, any>): string`

Evaluates a compiled AST with the provided context.

```javascript
const ast = engine.compile('Hello {{ name }}!');
const result = engine.evaluate(ast, { name: 'World' });
```

##### `addFilter(name: string, fn: FilterFunction): void`

Adds a custom filter function.

```javascript
engine.addFilter('custom', (value, arg1, arg2) => {
  // Your filter logic here
  return processedValue;
});
```

##### `getFilters(): string[]`

Returns an array of available filter names.

```javascript
const filters = engine.getFilters();
// ['lower', 'upper', 'capitalize', 'includes', ...]
```

### Built-in Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `lower` | Converts to lowercase | `{{ text \| lower }}` |
| `upper` | Converts to uppercase | `{{ text \| upper }}` |
| `capitalize` | Capitalizes first letter | `{{ text \| capitalize }}` |
| `includes` | Checks if string includes substring | `{{ text \| includes "search" }}` |

### Template Syntax

#### Variables

```javascript
{{ variableName }}
```

#### Filters

```javascript
{{ variable | filterName }}
{{ variable | filterName "arg1" "arg2" }}
{{ variable | filter1 | filter2 }}
```

#### Ternary Expressions

```javascript
{{ condition ? trueValue : falseValue }}
{{ variable | filter ? "yes" : "no" }}
```

#### Strings

```javascript
{{ "literal string" | upper }}
{{ "hello" | includes "he" }}
```

## 🔧 Development

### Prerequisites

- Node.js >= 18
- npm

### Setup

```bash
git clone https://github.com/dsfcoll/slottify.git
cd slottify
npm install
```

### Scripts

```bash
# Build the project
npm run build

# Development mode with watch
npm run dev

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Lint and fix
npm run lint:fix
```

### Testing

The project uses Vitest for testing. Run the test suite:

```bash
npm test
```

For debugging tests:

```bash
npm run test:debug
```

## 📦 Distribution

The library is built using tsup and outputs:

- `dist/index.js` - ESM bundle
- `dist/index.d.ts` - TypeScript definitions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by template engines like Handlebars and Mustache
- Built with modern JavaScript tooling (TypeScript, Vitest, tsup)
- Focused on simplicity and performance

---

**Made with ❤️ by [dsfcoll](https://github.com/dsfcoll)**
