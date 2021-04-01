import * as IO from 'fp-ts/IO';
import { flow, pipe } from 'fp-ts/function';
import { split, last } from '../utils';

// We now consider the following items:
//
//   // getFile :: IO String
//   const getFile = IO.of('/home/mostly-adequate/ch09.md');
//
//   // pureLog :: String -> IO ()
//   const pureLog = str => new IO(() => console.log(str));
//
// Use getFile to get the filepath, remove the directory and keep only the basename,
// then purely log it. Hint: you may want to use `split` and `last` to obtain the
// basename from a filepath.

declare const getFile: IO.IO<string>;

declare const pureLog: (str: string) => IO.IO<void>;

const basename = flow(split('/'), last);

export const logFilename: IO.IO<void> = pipe(
  getFile,
  IO.map(basename),
  IO.chain(pureLog)
);
