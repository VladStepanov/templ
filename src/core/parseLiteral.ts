export function parseLiteral(pipe: string) {
  const stringLiteral = pipe.trim().match(/^['"](?<content>.*)['"]$/);
  if (stringLiteral?.groups) {
    return stringLiteral.groups.content;
  }
}
