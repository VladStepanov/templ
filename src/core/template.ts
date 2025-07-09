import { Vars } from './vars.ts';
import { parsePipes } from './parsePipes.ts';

interface Options {
  escape: boolean;
}

export function render(template: string, vars?: Vars) {
  return template.replace(/\{\{([a-zA-Z0-9_.|\s?:"']+)}}/g, (...args) => {
    return parsePipes(args[1], vars);
  });
}
