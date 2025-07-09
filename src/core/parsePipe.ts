import { includePipe, lowerPipe, upperPipe } from './modifiers';
import { parseVar } from './parseVar.ts';
import { parseLiteral } from './parseLiteral.ts';
import { Vars } from './vars.ts';

export function parsePipe(current: string, pipe: string, vars: Vars): undefined | string {
  if (pipe.startsWith('var.') || pipe.startsWith('$')) {
    return parseVar(pipe, vars);
  }
  if (pipe === 'lower') {
    return lowerPipe(current);
  }
  if (pipe === 'upper') {
    return upperPipe(current);
  }
  if (pipe.startsWith('includes')) {
    return includePipe(current, pipe, vars);
  }
  if (pipe.startsWith('"') || pipe.startsWith('\'')) {
    return parseLiteral(pipe);
  }

  throw new Error('Invalid pipe ' + pipe);
}
