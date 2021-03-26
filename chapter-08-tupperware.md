# Chapter 08: Tupperware

## **Maybe**

implemented as **`Option`** . 

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

{% tabs %}
{% tab title="book" %}
```javascript
const moment = require('moment');

// getAge :: Date -> User -> Either(String, Number)
const getAge = curry((now, user) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? Either.of(now.diff(birthDate, 'years'))
    : left('Birth date could not be parsed');
});

getAge(moment(), { birthDate: '2005-12-12' });
// Right(9)

getAge(moment(), { birthDate: 'July 4, 2001' });
// Left('Birth date could not be parsed')

// fortune :: Number -> String
const fortune = compose(concat('If you survive, you will be '), toString, add(1));

// zoltar :: User -> Either(String, _)
//const zoltar = compose(map(console.log), map(fortune), getAge(moment()));

// zoltar :: User -> _
const zoltar = compose(console.log, either(id, fortune), getAge(moment()));
```
{% endtab %}

{% tab title="ts" %}
```typescript
import moment from 'moment';
import * as E from "fp-ts/lib/Either";

type User = {birthDate: string };

// getAge :: Date -> User -> Either(String, Number)
const getAge = (now: moment.Moment) => (user: User) => {
  const birthDate = moment(user.birthDate, 'YYYY-MM-DD');

  return birthDate.isValid()
    ? E.of(now.diff(birthDate, 'years'))
    : E.left('Birth date could not be parsed');
};

getAge(moment())({ birthDate: '2005-12-12' });
// Right(9)

getAge(moment())({ birthDate: 'July 4, 2001' });
// Left('Birth date could not be parsed')

// fortune :: Number -> String
const fortune = flow(add(1), toString, concat('If you survive, you will be '));

// zoltar :: User -> Either(String, _)
// const zoltar = flow(getAge(moment()), E.map(fortune), console.log);

// zoltar :: User -> _
const zoltar = flow(getAge(moment()), E.fold(identity, fortune), console.log);

zoltar({ birthDate: '2005-12-12' });
```
{% endtab %}
{% endtabs %}



