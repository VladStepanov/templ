export type TokenType
  = | 'OPEN_TEMPLATE'
    | 'CLOSE_TEMPLATE'
    | 'PIPE'
    | 'QUESTION'
    | 'COLON'
    | 'STRING'
    | 'IDENTIFIER'
    | 'TEXT';

export interface Token {
  type: TokenType;
  value: string;
}
