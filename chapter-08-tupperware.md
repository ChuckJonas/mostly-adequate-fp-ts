# Chapter 08: Tupperware

## **Maybe**

implemented as **`Option`** 

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
import { flow } from "fp-ts/function";
import * as O from "fp-ts/Option";

type Account = { balance: number };

// withdraw :: Number -> Account -> Maybe(Account)
const withdraw = (amount: number) => ({
  balance
}: Account): O.Option<Account> =>
  balance >= amount ? O.some({ balance: balance - amount }) : O.none;

const updateLedger = (account: Account) => account;

// remainingBalance :: Account -> String
const remainingBalance = ({ balance }: Account) =>
  `Your balance is $${balance}`;

// finishTransaction :: Account -> String
const finishTransaction = flow(updateLedger, remainingBalance);

// getTwenty :: Account -> String
const getTwenty = flow(
  withdraw(20),
  O.fold(() => "You're broke!", finishTransaction)
);

getTwenty({ balance: 200.0 });
// 'Your balance is $180.00'

getTwenty({ balance: 10.0 });
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
import moment from "moment";
import * as E from "fp-ts/Either";
import { flow, identity } from "fp-ts/function";

type User = { birthDate: string };

// getAge :: Date -> User -> Either(String, Number)
const getAge = (now: moment.Moment) => (user: User) => {
  const birthDate = moment(user.birthDate, "YYYY-MM-DD");

  return birthDate.isValid()
    ? E.of(now.diff(birthDate, "years"))
    : E.left("Birth date could not be parsed");
};

getAge(moment())({ birthDate: "2005-12-12" });
// Right(9)

getAge(moment())({ birthDate: "July 4, 2001" });
// Left('Birth date could not be parsed')

// fortune :: Number -> String
const fortune = flow(add(1), toString, concat("If you survive, you will be "));

// zoltar :: User -> Either(String, _)
// const zoltar = flow(getAge(moment()), E.map(fortune), console.log);

// zoltar :: User -> _
const zoltar = flow(getAge(moment()), E.fold(identity, fortune), console.log);

zoltar({ birthDate: "2005-12-12" });
```
{% endtab %}
{% endtabs %}

## IO

IO is implemented a little different from the above functors.  Since IO is really just a "thunk", it's as it's one of the concepts which `ts` can support first class.   

{% tabs %}
{% tab title="book" %}
```javascript
// ioWindow :: IO Window
const ioWindow = new IO(() => window);

ioWindow.map(win => win.innerWidth);
// IO(1430)

ioWindow
  .map(prop('location'))
  .map(prop('href'))
  .map(split('/'));
// IO(['http:', '', 'localhost:8000', 'blog', 'posts'])


// $ :: String -> IO [DOM]
const $ = selector => new IO(() => document.querySelectorAll(selector));

$('#myDiv').map(head).map(div => div.innerHTML);
// IO('I am some inner html')
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { pipe } from "fp-ts/function";
import * as IO from "fp-ts/IO";

// ioWindow :: IO Window
const ioWindow: IO.IO<Window> = () => window;
// same as `IO.of(window);`

IO.map((win: Window) => win.innerWidth)(ioWindow);
// IO(1430)

const $ = (selector: string) => IO.of(document.querySelectorAll(selector));

pipe(
  $("#myDiv"),
  //need to convert NodeListOf -> Array. Typescript doesn't like just `Array.from`
  IO.map((a) => Array.from(a)),
  IO.map(head),
  IO.map((div) => div.innerHTML)
);
// IO('I am some inner html')
```
{% endtab %}
{% endtabs %}

## Task

In `fp-ts` a Task is defined as a `() => Promise` function that will never fail.  [Practical Guide to fp-ts](https://rlee.dev/writing/practical-guide-to-fp-ts-part-3) chapter on this does a great job explaining this concept.  
  
The book's use of `Task` would more closely be represented using `TaskEither`

{% tabs %}
{% tab title="book" %}
```javascript
// getJSON :: String -> {} -> Task Error JSON
const getJSON = curry((url, params) => new Task((reject, result) => {
  $.getJSON(url, params, result).fail(reject);
}));

getJSON('/video', { id: 10 }).map(prop('title'));
// Task('Family Matters ep 15')
```
{% endtab %}

{% tab title="ts" %}
```typescript
import * as $ from "jquery";
import { pipe, flow } from "fp-ts/function";
import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";

type Video = { title: string };

const getJSON = <T>(url: string) => (params: Record<string, any>) =>
  TE.tryCatch(
    () =>
      new Promise((resolve: (a: T) => void, reject: (e: any) => void) => {
        $.getJSON(url, params, resolve).fail((e) =>
          reject(new Error(e.statusText))
        );
      }),
    (reason) => new Error(String(reason))
  );

pipe(
  { id: 10 },
  getJSON<Video>("/video"),
  TE.map(prop("title")),
  TE.fold((e) => T.of(e.message), T.of)
);
// Task('Family Matters ep 15')

// -- Pure application -------------------------------------------------

type Post = { date: string };

// blogPage :: Posts -> HTML
const blogPage = Handlebars.compile<Post>(blogTemplate);

// renderPage :: Posts -> HTML
const renderPage = flow(sortBy<Post>(prop("date")), blogPage);

// blog :: Params -> TaskEither Error HTML
const blog = flow(getJSON<Post>("/posts"), TE.map(renderPage), (v) => v);

// -- Impure calling code ----------------------------------------------
blog({})().then((e) =>
  pipe(
    e,
    E.fold(
      (error) => $("#error").html(error.message),
      (page) => $("#main").html(page)
    )
  )
);
```
{% endtab %}
{% endtabs %}



