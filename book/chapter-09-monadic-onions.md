# Chapter 09: Monadic Onions

## Join & Chain

{% tabs %}
{% tab title="book" %}
```javascript
// safeProp :: Key -> {Key: a} -> Maybe a
const safeProp = curry((x, obj) => Maybe.of(obj[x]));

// safeHead :: [a] -> Maybe a
const safeHead = safeProp(0);

// firstAddressStreet :: User -> Maybe Street
const firstAddressStreet = compose(
  join,
  map(safeProp('street')),
  join,
  map(safeHead),
  safeProp('addresses'),
);

// firstAddressStreet :: User -> Maybe Street
const firstAddressStreetChained = compose(
  chain(safeProp('street')),
  chain(safeHead),
  safeProp('addresses'),
);

firstAddressStreet({
  addresses: [{ street: { name: 'Mulburry', number: 8402 }, postcode: 'WC2N' }],
});
// Maybe({name: 'Mulburry', number: 8402})
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { head } from "fp-ts/Array";
import { flow } from "fp-ts/function";
import * as O from "fp-ts/Option";
import { safeProp } from '../utils';

type Street = { name: string; number: number };

type AddressBook = {
  addresses: {
    street: Street;
    postcode: string;
  }[];
};

// safeHead :: [a] -> Maybe a
const safeHead = head;

// firstAddressStreet :: User -> Maybe Street
export const firstAddressStreet: (addressBook: AddressBook) => O.Option<Street> = flow(
  safeProp("addresses"),
  O.map(safeHead),
  O.flatten,
  O.map(safeProp("street")),
  O.flatten,
);

// firstAddressStreet :: User -> Maybe Street
export const firstAddressStreetChained: (addressBook: AddressBook) => O.Option<Street> = flow(
  safeProp("addresses"),
  O.chain(safeHead),
  O.chain(safeProp("street")),
);

firstAddressStreet({
  addresses: [{ street: { name: "Mulburry", number: 8402 }, postcode: "WC2N" }],
});
// Option({name: 'Mulburry', number: 8402})

```
{% endtab %}
{% endtabs %}

