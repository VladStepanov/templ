export function safeSplitPipes(str: string): string[] {
  const result = [];
  let current = '';
  let insideQuotes = false;
  let quoteChar = '';
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if ((char === '"' || char === '\'') && (i === 0 || str[i - 1] !== '\\')) {
      if (insideQuotes && char === quoteChar) {
        insideQuotes = false;
      } else if (!insideQuotes) {
        insideQuotes = true;
        quoteChar = char;
      }
    }
    if (char === '|' && !insideQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}
