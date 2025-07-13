# slottify Examples

This directory contains practical examples demonstrating how to use the slottify template engine.

## Examples

### Basic Usage (`basic-usage.js`)

Demonstrates the core functionality of slottify:

- Basic variable substitution
- Built-in filters (`lower`, `upper`, `capitalize`, `includes`)
- Filter chaining
- Ternary expressions
- Custom filters

**Run it:**
```bash
node examples/basic-usage.js
```

### Email Templates (`email-templates.js`)

Shows practical usage for email generation with:

- Welcome email template
- Order confirmation template
- Password reset template
- Newsletter template
- Custom filters for formatting (dates, currency, text truncation)

**Run it:**
```bash
node examples/email-templates.js
```

## Running Examples

### Prerequisites

1. Build the project first:
   ```bash
   npm run build
   ```

2. Make sure you're in the project root directory

### Running Individual Examples

```bash
# Basic usage
node examples/basic-usage.js

# Email templates
node examples/email-templates.js
```

### Expected Output

The examples will output rendered templates to the console, showing how slottify processes different types of templates and data.

## Creating Your Own Examples

To create your own examples:

1. Create a new `.js` file in the `examples/` directory
2. Import the TemplateEngine:
   ```javascript
   import { TemplateEngine } from '../dist/index.js';
   ```
3. Create your template and data
4. Use `engine.render()` to process the template
5. Output the results

### Example Structure

```javascript
import { TemplateEngine } from '../dist/index.js';

const engine = new TemplateEngine();

// Add custom filters if needed
engine.addFilter('custom', (value) => {
  // Your filter logic
  return processedValue;
});

// Define your template
const template = 'Hello {{ name | upper }}!';

// Define your data
const data = { name: 'world' };

// Render the template
const result = engine.render(template, data);
console.log(result);
```

## Tips for Examples

1. **Keep it simple**: Start with basic variable substitution
2. **Show progression**: Build complexity gradually
3. **Use realistic data**: Make examples relatable
4. **Demonstrate features**: Show filters, ternaries, custom filters
5. **Add comments**: Explain what each part does
6. **Show output**: Include expected output in comments

## Contributing Examples

When contributing new examples:

1. Follow the existing naming convention
2. Include clear comments explaining the code
3. Show expected output in comments
4. Keep examples focused and educational
5. Test your examples before submitting

## Common Patterns

### Custom Filters

```javascript
engine.addFilter('formatDate', (date) => {
  return new Date(date).toLocaleDateString();
});
```

### Conditional Content

```javascript
const template = '{{ isActive ? "Online" : "Offline" }}';
```

### Filter Chaining

```javascript
const template = '{{ text | lower | upper }}';
```

### Complex Ternaries

```javascript
const template = '{{ name | lower | includes "admin" ? "Administrator" : "User" }}';
``` 