# Chapter 08: Tupperware

## **Maybe**

In `fp-ts` this is implemented as **`Option`** . 

{% tabs %}
{% tab title="book" %}
```javascript
// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = curry((amount, { balance }) =>
  Maybe.of(balance >= amount ? { balance: balance - amount } : null));

// This function is hypothetical, not implemented here... nor anywhere else.
// updateLedger :: Account -> Account 
const updateLedger = account => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }) => `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = compose(remainingBalance, updateLedger);

// getTwenty :: Account -> String
const getTwenty = compose(maybe('You\'re broke!', finishTransaction), withdraw(20));

getTwenty({ balance: 200.00 }); 
// 'Your balance is $180.00'

getTwenty({ balance: 10.00 }); 
// 'You\'re broke!'
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { flow, identity } from "fp-ts/lib/function";
import * as O from "fp-ts/lib/Option";

type Account = { balance: number };

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = (amount: number) => 
  ({ balance}: Account): O.Option<Account> =>
      balance >= amount ? O.some({ balance: balance - amount }) : O.none;

const updateLedger = (account: Account) => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }: BankAccount) =>
  `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = flow(updateLedger, remainingBalance);

// getTwenty :: Account -> String
const getTwenty = flow(
  withdraw(20),
  O.fold(() => 'You\'re broke!', finishTransaction)
);

getTwenty({ balance: 200.00 }); 
// 'Your balance is $180.00'

getTwenty({ balance: 10.00 }); 
// 'You\'re broke!'
```
{% endtab %}
{% endtabs %}

## Either

TODO

