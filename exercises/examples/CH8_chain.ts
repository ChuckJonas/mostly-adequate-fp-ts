import { head } from 'fp-ts/Array';
import { flow } from "fp-ts/function";
import * as O from 'fp-ts/Option';
import * as R from 'fp-ts/Record';

type AddressBook = {
  addresses: {
    street: {
        name: string;
        number: number;
    };
    postcode: string;
  }[]
}

// safeProp :: Key -> {Key: a} -> Maybe a
const safeProp = R.lookup

// safeHead :: [a] -> Maybe a
const safeHead = head;

// AddressBook => Maybe({name: string, number: number})
const firstAddressStreet = flow(
  (addresses: AddressBook) =>  addresses,
  safeProp('addresses'),
  O.chain(safeHead),
  O.chain(safeProp('street')),
);

firstAddressStreet({
  addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
});
// Maybe({name: 'Mulburry', number: 8402})
