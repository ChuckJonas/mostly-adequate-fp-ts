---
description: Curry
---

# Chapter 4

A lot of the books uses a function `curry` to take a normal function and transform it to something that can be partial applied.  Unfortunately at the time of writing this, `ts-fp` does not have an equivalent  "auto-curry" function [because it's not possible to do so and retain complete types](https://github.com/gcanti/fp-ts/issues/640).  
  
You must manually write your functions in curry format:

{% tabs %}
{% tab title="book" %}
```javascript
const match = curry((what, s) => s.match(what));
```
{% endtab %}

{% tab title="ts" %}
```typescript
const match = (what: string | RegExp) => (s: string) => s.match(what);
```
{% endtab %}
{% endtabs %}

Using these functions remains the same, you just lose the flexibility of calling it either way.

### Map

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
import { map } from "fp-ts/lib/Array";
const getChildren = (x: HTMLElement) => x.childNodes;
const allTheChildren = map(getChildren);
```
{% endtab %}
{% endtabs %}

{% hint style="info" %}
One key difference between the book and `ts-fp` is that the book uses a single generic `map` function.  In order to maintain type safety, we must use a `map` function provided for each "functor".    
  
In the above example, we need to map over an array, so we "fp-ts/lib/Array".
{% endhint %}

