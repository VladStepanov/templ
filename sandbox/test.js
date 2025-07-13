import { TemplateEngine } from '../dist/index.js';

const engine = new TemplateEngine();

const template = 'foo {{ role | includes "admin" }}';

const res = engine.render(template);
console.log(res);
