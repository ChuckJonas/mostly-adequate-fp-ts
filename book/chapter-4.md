# Chapter 04: Currying

The book uses a function `curry` to transform a regular function it to something that can be partial applied. Unfortunately, `fp-ts` does not have an equivalent "auto-curry" function [because it's not possible to do so and retain complete types](https://github.com/gcanti/fp-ts/issues/640).

You must manually write your functions in curry format:

{% tabs %}
{% tab title="book" %}
```javascript
const match = curry((what, s) => s.match(what));
const replace = curry((what, replacement, s) => s.replace(what, replacement));
```
{% endtab %}

{% tab title="ts" %}
```typescript
const match = (what: string | RegExp) => (s: string) => s.match(what);
const replace = (search: string | RegExp) => (replace: string) => (s: string) =>
  s.replace(search, replace);

// here's some others that will be used later on
const add = (a: number) => (b: number) => a + b;
const concat = (a: string) => (b: string) => a + b;
const toString = (a: number) => a.toString();
const split = (search: string | RegExp) => (s: string) => s.split(search);
const toLower = (s: string) => s.toLocaleLowerCase();
const head = <T>(arr: T[]): T => arr[0];
```
{% endtab %}
{% endtabs %}

Using these functions remains the same; you just lose the flexibility of calling it either way.

## Map

{% tabs %}
{% tab title="book" %}
```javascript
const map = curry((f, xs) => xs.map(f));
const getChildren = x => x.childNodes;
const allTheChildren = map(getChildren);
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { map } from "fp-ts/ReadonlyArray";
const getChildren = (x: HTMLElement) => x.childNodes;
const allTheChildren = map(getChildren);
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
One key difference between the book and `fp-ts` is that the book uses a single generic `map` function. In order to maintain type safety, `fp-ts` provides a specific `map` functions for each functor.

In the above example, we need to map over an array, so we import from`fp-ts/ReadonlyArray`.
{% endhint %}

