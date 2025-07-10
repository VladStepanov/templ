import { parsePipe } from './parsePipe.ts';
import { Vars } from './vars.ts';
import { safeSplitPipes } from './safeSplitPipes.ts';

export function parsePipes(pipes: string, _vars?: Vars) {
  let current = '';
  const vars = { ..._vars };
  for (const pipe of safeSplitPipes(pipes)) {
    vars['$cur'] = current;
    const res = parsePipe(current, pipe.trim(), vars);
    if (res === undefined || res === null) {
      throw new Error('undefined received from pipe: ' + pipe);
    }
    current = res;
  }

  return current;
}
