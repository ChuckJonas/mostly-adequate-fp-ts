import * as O from 'fp-ts/Option'
import { flow } from 'fp-ts/function';
import { safeProp } from '../utils';

type User = {
  id: number;
  name: string;
  address: {
    street: {
      number: 22;
      name: 'Walnut St';
    };
  };
};

// Use `safeProp` and `map/join` or `chain` to safely get the street name when given a user

// getStreetName :: User -> Option String
export const getStreetName: (user: User) => O.Option<string> = flow(
  safeProp("address"),
  O.chain(safeProp("street")),
  O.chain(safeProp("name"))
);
