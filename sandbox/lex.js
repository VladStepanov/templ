// eslint-disable-next-line sonarjs/cognitive-complexity
function lex(template) {
  const tokens = [];
  let state = 'TEXT';
  let buffer = '';
  let exprBuffer = '';

  for (let i = 0; i < template.length; i++) {
    const char = template[i];

    switch (state) {
      case 'TEXT':
        if (char === '{') {
          state = 'LBRACE1';
        } else {
          buffer += char;
        }
        break;

      case 'LBRACE1':
        if (char === '{') {
          if (buffer) {
            tokens.push({ type: 'text', value: buffer });
            buffer = '';
          }
          state = 'EXPR';
          exprBuffer = '';
        } else {
          buffer += '{' + char;
          state = 'TEXT';
        }
        break;

      case 'EXPR':
        if (char === '}') {
          state = 'RBRACE1';
        } else {
          exprBuffer += char;
        }
        break;

      case 'RBRACE1':
        if (char === '}') {
          tokens.push({ type: 'expression', value: exprBuffer.trim() });
          exprBuffer = '';
          state = 'TEXT';
        } else {
          exprBuffer += '}' + char;
          state = 'EXPR';
        }
        break;
    }
  }

  // Остатки буфера
  if (state === 'TEXT' && buffer) {
    tokens.push({ type: 'text', value: buffer });
  }

  return tokens;
}

const input = 'Hi {{ user.name | lower }}!';
const tokens = lex(input);

console.log(tokens);
