# Chapter 05: Coding by Composing

The book heavily relies on a function called `compose` which combines functions `Right -> Left`.  This ordering is prefer  
  
`fp-ts` provides the same functionality via `flow`except it operates on functions from `Left -> Right` . 

{% tabs %}
{% tab title="book" %}
```javascript
const toUpperCase = x => x.toUpperCase();
const exclaim = x => `${x}!`;
const shout = compose(exclaim, toUpperCase);

shout('send in the clowns'); // "SEND IN THE CLOWNS!"
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { flow, identity } from "fp-ts/lib/function";
const toUpperCase = (x: string) => x.toUpperCase();
const exclaim = (x: string) => `${x}!`;
// note: order here is reversed
const shout = flow(toUpperCase, exclaim); 

shout('send in the clowns'); // "SEND IN THE CLOWNS!"
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
`fp-ts` also provides a function called `pipe` which operates in a similar manor, except the first parameter acts as the input:

```typescript
let output = pipe(
  'send in the clowns', 
  toUpperCase, 
  exclaim
);  // "SEND IN THE CLOWNS!" 
```
{% endhint %}

{% tabs %}
{% tab title="book" %}
```javascript
const dasherize = compose(
  intercalate('-'),
  map(toLower),
  split(' '),
  replace(/\s{2,}/ig, ' '),
);

dasherize('The world is a vampire'); // 'the-world-is-a-vampire'
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { map, Foldable } from "fp-ts/Array";
import * as S from "fp-ts/string";
import { intercalate } from "fp-ts/Foldable";

const replace = (search: string | RegExp) => (replace: string) => (s: string) =>
  s.replace(search, replace);
const split = (search: string | RegExp) => (s: string) => s.split(search);
const toLower = (s: string) => s.toLocaleLowerCase();

const stringIntercalculate = (sep: string) => (s: string[]) =>
  intercalate(S.Monoid, Foldable)(sep, s);

const dasherize = flow(
  replace(/\s{2,}/gi)(" "),
  split(" "),
  map(toLower),
  stringIntercalculate("-")
);

let output = dasherize("The world is a vampire"); // 'the-world-is-a-vampire'
```
{% endtab %}
{% endtabs %}



