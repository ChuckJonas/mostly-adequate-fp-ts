# Chapter 06: Example Application

The only "new" concept is just the`prop` function.   [`fp-ts` does not provide an equivalent function](https://github.com/gcanti/fp-ts/issues/799), but a more powerful library called [monocle-ts](https://github.com/gcanti/monocle-ts) is recommended for this purpose.  There is also a library called [fp-ts-ramda](https://github.com/giogonzo/fp-ts-ramda) which offer this function, among others to help bring feature parity to `fp-ts`.

I've modified the [fp-ts-ramda implementation](https://github.com/giogonzo/fp-ts-ramda/blob/master/src/prop.ts) so it can be used without any additional dependency for the purpose of this book:

{% tabs %}
{% tab title="book" %}
```javascript
const prop = curry((property, object) => object[property]);
```
{% endtab %}

{% tab title="ts" %}
```typescript
export function prop<K extends string>(k: K): <T extends Record<K, any>>(obj: T) => T[K];
export function prop<K extends keyof T, T extends object>(k: K, obj: T): T[K];
export function prop<K extends string, T extends Record<K, any>>(k: K, obj?: T): T[K] | ((obj: T) => T[K]) {
  if (obj === undefined) {
    return <T extends Record<K, any>>(obj: T): T[K] => obj[k];
  } else {
    return obj[k];
  }
}
```
{% endtab %}
{% endtabs %}







