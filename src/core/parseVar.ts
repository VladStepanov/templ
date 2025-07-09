import { Vars } from './vars.ts';

export function parseVar(pipe: string, vars: Vars): undefined | string {
  if (pipe.startsWith('var.')) {
    const varName = pipe.split('var.')[1]?.trim();
    return vars[varName];
  }
  if (pipe.startsWith('$')) {
    const varName = pipe.split('$')[1]?.trim();
    return vars['$' + varName];
  }
}
