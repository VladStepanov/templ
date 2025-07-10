import { parsePipe } from '../parsePipe.ts';
import { Vars } from '../vars.ts';

export function includePipe(current: string, pipe: string, vars: Vars): undefined | string {
  // eslint-disable-next-line sonarjs/slow-regex
  const res = pipe.match(/^includes (?<quote>['"])(?<match>[^'"]+)\k<quote>\s*\?\s*(?<trueBranch>[^:\s][^:]*)\s*:\s*(?<falseBranch>.+)/);
  if (!res?.groups) {
    throw new Error('Invalid include pipe: ' + pipe);
  }
  const trueBranch = current.includes(res.groups.match);
  if (trueBranch) {
    return parsePipe(current, res.groups.trueBranch, vars);
  } else {
    return parsePipe(current, res.groups.falseBranch, vars);
  }
}
