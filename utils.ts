/**
 * Utilities that are defined in the book that are used throughout, rewritten in Typescript
 * so that we can use them in the exercise solutions
 */
export const add = (a: number, b: number) => a + b;

export const append = (strToAppend: string) => (str: string): string =>
  str.concat(strToAppend);
