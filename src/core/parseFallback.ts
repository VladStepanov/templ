import { Vars } from './vars.ts';
import { parseVar } from './parseVar.ts';
import { parseLiteral } from './parseLiteral.ts';

export function parseFallback(pipe: string, vars: Vars) {
  const items = pipe.split('??');
  if (items.length < 2) {
    throw new Error('Invalid fallback: ' + pipe);
  }

  let result;
  for (const _item of items) {
    const item = _item.trim();
    if (item.startsWith('var.') || item.startsWith('$')) {
      result = parseVar(item, vars);
    }
    if (item.startsWith('"') || item.startsWith('\'')) {
      result = parseLiteral(item);
    }
    if (result) {
      break;
    }
  }

  return result;
}
