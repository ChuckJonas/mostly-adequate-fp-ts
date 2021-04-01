import * as E from 'fp-ts/Either';
import * as IO from 'fp-ts/IO';
import { flow } from 'fp-ts/lib/function';

type Email = string;

// For this exercise, we consider helpers with the following signatures:

declare const validateEmail: (email: Email) => E.Either<string, Email>;
declare const addToMailingList: (email: Email) => IO.IO<Email[]>;
declare const emailBlast: (emails: Email[]) => IO.IO<void>;

// Use `validateEmail`, `addToMailingList` and `emailBlast` to create a function
// which adds a new email to the mailing list if valid, and then notify the whole
// list.

// joinMailingList :: Email -> Either String (IO ())
export const joinMailingList: (email: Email) => E.Either<string, IO.IO<void>> = flow(
  validateEmail,
  E.map(flow(addToMailingList, IO.chain(emailBlast))),
);
