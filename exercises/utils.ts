import * as O from 'fp-ts/Option';

/**
 * Utilities that are defined in the book that are used throughout, rewritten in Typescript
 * so that we can use them in the exercise solutions
 */
export const add = (a: number, b: number) => a + b;

export const append = (strToAppend: string) => (str: string): string => str.concat(strToAppend);

export const prop = <Path extends string>(path: Path) => <Value, Rest>(obj: Record<Path, Value> & Rest): Value => obj[path];

// safeProp :: Key -> {Key: a} -> Maybe a
export const safeProp: <Key extends string>(key: Key) => <T extends Record<string, unknown>>(obj: T) => O.Option<T[Key]> = (key) => (obj) =>
  O.fromNullable(obj[key]);
