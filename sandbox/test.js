import { TemplateEngine } from '../dist/corev2/index.js';

const engine = new TemplateEngine();

const template = 'foo {{ "| test" | upper }}';

const res = engine.render(template);
console.log(res);
