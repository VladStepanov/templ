# slottify API Documentation

## Overview

slottify is a lightweight JavaScript template engine that provides a simple syntax for variable substitution, filtering, and conditional expressions. This document provides detailed technical information about the API.

## Core Classes

### TemplateEngine

The main class for template processing and rendering.

#### Constructor

```typescript
new TemplateEngine(): TemplateEngine
```

Creates a new template engine instance with built-in filters.

#### Methods

##### `render(template: string, context?: Record<string, any>): string`

Renders a template string with the provided context.

**Parameters:**
- `template: string` - The template string to render
- `context?: Record<string, any>` - Optional context object containing variables

**Returns:**
- `string` - The rendered template

**Example:**
```javascript
const engine = new TemplateEngine();
const result = engine.render('Hello {{ name }}!', { name: 'World' });
// Returns: "Hello World!"
```

##### `compile(template: string): ASTNode[]`

Compiles a template string into an Abstract Syntax Tree (AST).

**Parameters:**
- `template: string` - The template string to compile

**Returns:**
- `ASTNode[]` - Array of AST nodes representing the parsed template

**Example:**
```javascript
const engine = new TemplateEngine();
const ast = engine.compile('Hello {{ name }}!');
// Returns AST representation of the template
```

##### `evaluate(ast: ASTNode[], context?: Record<string, any>): string`

Evaluates a compiled AST with the provided context.

**Parameters:**
- `ast: ASTNode[]` - Compiled AST from `compile()`
- `context?: Record<string, any>` - Optional context object

**Returns:**
- `string` - The evaluated result

**Example:**
```javascript
const engine = new TemplateEngine();
const ast = engine.compile('Hello {{ name }}!');
const result = engine.evaluate(ast, { name: 'World' });
// Returns: "Hello World!"
```

##### `addFilter(name: string, fn: FilterFunction): void`

Adds a custom filter function to the engine.

**Parameters:**
- `name: string` - The name of the filter
- `fn: FilterFunction` - The filter function

**FilterFunction Type:**
```typescript
type FilterFunction = (value: any, ...args: any[]) => any;
```

**Example:**
```javascript
const engine = new TemplateEngine();

engine.addFilter('reverse', (value) => {
  return String(value).split('').reverse().join('');
});

const result = engine.render('{{ text | reverse }}', { text: 'hello' });
// Returns: "olleh"
```

##### `getFilters(): string[]`

Returns an array of available filter names.

**Returns:**
- `string[]` - Array of filter names

**Example:**
```javascript
const engine = new TemplateEngine();
const filters = engine.getFilters();
// Returns: ['lower', 'upper', 'capitalize', 'includes']
```

## Built-in Filters

### lower

Converts a string to lowercase.

**Signature:** `(value: any): string`

**Example:**
```javascript
engine.render('{{ text | lower }}', { text: 'HELLO WORLD' });
// Returns: "hello world"
```

### upper

Converts a string to uppercase.

**Signature:** `(value: any): string`

**Example:**
```javascript
engine.render('{{ text | upper }}', { text: 'hello world' });
// Returns: "HELLO WORLD"
```

### capitalize

Capitalizes the first letter of a string.

**Signature:** `(value: any): string`

**Example:**
```javascript
engine.render('{{ text | capitalize }}', { text: 'hello world' });
// Returns: "Hello world"
```

### includes

Checks if a string includes a substring.

**Signature:** `(value: any, search: any): boolean`

**Example:**
```javascript
engine.render('{{ text | includes "world" }}', { text: 'hello world' });
// Returns: "true"
```

## Template Syntax

### Variables

Variables are referenced using double curly braces: `{{ variableName }}`

```javascript
engine.render('Hello {{ name }}!', { name: 'World' });
// Returns: "Hello World!"
```

### Filters

Filters are applied using the pipe operator: `{{ variable | filterName }}`

**Single filter:**
```javascript
engine.render('{{ text | upper }}', { text: 'hello' });
// Returns: "HELLO"
```

**Filter with arguments:**
```javascript
engine.render('{{ text | includes "world" }}', { text: 'hello world' });
// Returns: "true"
```

**Chaining filters:**
```javascript
engine.render('{{ text | lower | upper }}', { text: 'Hello World' });
// Returns: "HELLO WORLD"
```

### Ternary Expressions

Conditional expressions using the ternary operator: `{{ condition ? trueValue : falseValue }}`

**Simple ternary:**
```javascript
engine.render('{{ isActive ? "Online" : "Offline" }}', { isActive: true });
// Returns: "Online"
```

**Ternary with filters:**
```javascript
engine.render('{{ name ? name | upper : "Anonymous" }}', { name: 'john' });
// Returns: "JOHN"
```

**Complex ternary:**
```javascript
engine.render('{{ name | lower | includes "peter" ? "No Peter!" : name }}', { name: 'Peter' });
// Returns: "No Peter!"
```

### String Literals

String literals can be used directly in templates: `{{ "string" | filter }}`

```javascript
engine.render('{{ "hello world" | upper }}');
// Returns: "HELLO WORLD"
```

## AST Types

### TextNode

Represents plain text in the template.

```typescript
interface TextNode {
  type: 'TEXT';
  value: string;
}
```

### TemplateNode

Represents a template expression.

```typescript
interface TemplateNode<T = ExpressionNode> {
  type: 'TEMPLATE';
  expression: ExpressionNode<T>;
}
```

### VariableNode

Represents a variable reference.

```typescript
interface VariableNode {
  type: 'VARIABLE';
  name: string;
}
```

### StringNode

Represents a string literal.

```typescript
interface StringNode {
  type: 'STRING';
  value: string;
}
```

### FilterNode

Represents a filter with arguments.

```typescript
interface FilterNode {
  type: 'FILTER';
  name: string;
  args: ExpressionNode[];
}
```

### PipeNode

Represents a pipe expression (variable with filter).

```typescript
interface PipeNode {
  type: 'PIPE';
  left: ExpressionNode;
  filter: FilterNode;
}
```

### TernaryNode

Represents a ternary expression.

```typescript
interface TernaryNode {
  type: 'TERNARY';
  condition: ExpressionNode;
  trueExpr: ExpressionNode;
  falseExpr: ExpressionNode;
}
```

### Union Types

```typescript
type ExpressionNode<T = VariableNode | StringNode | PipeNode | TernaryNode> = T;
type ASTNode<T = ExpressionNode> = TextNode | TemplateNode<T>;
```

## Error Handling

### Unknown Filter Error

When an unknown filter is used, the engine throws an error:

```javascript
try {
  engine.render('{{ text | unknown }}', { text: 'hello' });
} catch (error) {
  console.error(error.message); // "Unknown filter: unknown"
}
```

### Missing Variables

Missing variables are handled gracefully by returning empty strings:

```javascript
engine.render('Hello {{ name }}!', {});
// Returns: "Hello !"
```

## Performance Considerations

### Compilation vs Rendering

For templates that will be used multiple times, consider using the compile/evaluate pattern:

```javascript
const engine = new TemplateEngine();
const ast = engine.compile('Hello {{ name }}!');

// Reuse the compiled AST for multiple renders
const result1 = engine.evaluate(ast, { name: 'Alice' });
const result2 = engine.evaluate(ast, { name: 'Bob' });
```

### Custom Filter Performance

When creating custom filters, consider performance implications:

```javascript
// Good: Simple string operations
engine.addFilter('trim', (value) => String(value).trim());

// Good: Cached complex operations
const cache = new Map();
engine.addFilter('expensive', (value) => {
  if (cache.has(value)) return cache.get(value);
  const result = expensiveOperation(value);
  cache.set(value, result);
  return result;
});
```

## Examples

### User Profile Template

```javascript
const engine = new TemplateEngine();

const user = {
  firstName: 'john',
  lastName: 'doe',
  email: 'JOHN@EXAMPLE.COM',
  isAdmin: true,
  lastLogin: '2024-01-15'
};

const template = `
User Profile:
Name: {{ firstName | capitalize }} {{ lastName | capitalize }}
Email: {{ email | lower }}
Role: {{ isAdmin ? "Administrator" : "User" }}
Status: {{ lastLogin ? "Last login: " + lastLogin : "Never logged in" }}
`;

const result = engine.render(template, user);
```

### Conditional Email Template

```javascript
const engine = new TemplateEngine();

engine.addFilter('formatDate', (date) => {
  return new Date(date).toLocaleDateString();
});

const emailTemplate = `
Dear {{ name | capitalize }},

{{ orderCount > 0 ? 
  "Thank you for your recent order. Your order #" + orderId + " has been confirmed." :
  "Thank you for your interest in our products."
}}

{{ isVIP ? "As a VIP customer, you have access to exclusive benefits." : "" }}

Best regards,
The Team
`;

const context = {
  name: 'alice',
  orderCount: 1,
  orderId: 'ORD-12345',
  isVIP: true
};

const email = engine.render(emailTemplate, context);
```