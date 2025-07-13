import { TemplateEngine } from '../dist/index.js';

// Create a new template engine instance
const engine = new TemplateEngine();

console.log('=== Basic Variable Substitution ===');
const basicResult = engine.render('Hello {{ name }}!', { name: 'World' });
console.log(basicResult);
// Output: Hello World!

console.log('\n=== Multiple Variables ===');
const multiResult = engine.render('{{ greeting }} {{ name }}!', {
  greeting: 'Hello',
  name: 'World',
});
console.log(multiResult);
// Output: Hello World!

console.log('\n=== Built-in Filters ===');
console.log('Lowercase:', engine.render('{{ text | lower }}', { text: 'HELLO WORLD' }));
console.log('Uppercase:', engine.render('{{ text | upper }}', { text: 'hello world' }));
console.log('Capitalize:', engine.render('{{ text | capitalize }}', { text: 'hello world' }));
console.log('Includes:', engine.render('{{ text | includes "world" }}', { text: 'hello world' }));

console.log('\n=== Filter Chaining ===');
const chainResult = engine.render('{{ text | lower | upper }}', { text: 'Hello World' });
console.log(chainResult);
// Output: HELLO WORLD

console.log('\n=== Ternary Expressions ===');
console.log('True condition:', engine.render('{{ isActive ? "Online" : "Offline" }}', { isActive: true }));
console.log('False condition:', engine.render('{{ isActive ? "Online" : "Offline" }}', { isActive: false }));

console.log('\n=== Complex Ternary ===');
const complexResult = engine.render('{{ name | lower | includes "peter" ? "No Peter!" : name }}', { name: 'Peter' });
console.log(complexResult);
// Output: No Peter!

console.log('\n=== Custom Filters ===');
// Add a custom filter
engine.addFilter('reverse', (value) => {
  return String(value).split('').reverse().join('');
});

const customResult = engine.render('{{ text | reverse }}', { text: 'hello' });
console.log(customResult);
// Output: olleh

// Add a filter with arguments
engine.addFilter('replace', (value, search, replace) => {
  return String(value).replace(String(search), String(replace));
});

const replaceResult = engine.render('{{ text | replace "world" "universe" }}', { text: 'hello world' });
console.log(replaceResult);
// Output: hello universe

console.log('\n=== Available Filters ===');
console.log('Built-in filters:', engine.getFilters());
