declare module 'ofx-js' {
  /** Única API real do pacote (CJS: `exports.parse`). Não existe `parseString`. */
  export function parse(content: string): Promise<unknown>;
}
