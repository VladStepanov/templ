import { Vars } from './vars.ts';
import { parsePipes } from './parsePipes.ts';

interface Options {
  escape: boolean;
}

export function render(template: string, vars?: Vars) {
  // eslint-disable-next-line sonarjs/slow-regex
  return template.replace(/\{\{\s*(.+?)\s*}}/gi, (...args) => {
    return parsePipes(args[1], vars);
  });
}
