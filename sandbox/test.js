import { render } from '../dist/index.js';

const template = 'foo {{ "| test" | upper }}';

const res = render(template);
console.log(res);
