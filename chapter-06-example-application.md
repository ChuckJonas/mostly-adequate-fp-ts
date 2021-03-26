# Chapter 06: Example Application

The only "new" concept here is the `prop` function.   As far as I can tell, [`fp-ts` does not provide an equivalent function](https://github.com/gcanti/fp-ts/issues/799).  A more powerful library called [monocle-ts](https://github.com/gcanti/monocle-ts) is recommended.

I've provided my own implementation below that should work for the context of this book:

{% tabs %}
{% tab title="book" %}
```javascript
const prop = curry((property, object) => object[property]);
```
{% endtab %}

{% tab title="ts" %}
```typescript
const prop = <T, K extends keyof T>(property: K) => (object:T): T[K] => 
   object[property];
```
{% endtab %}
{% endtabs %}

{% hint style="warning" %}
This implementation has some limitations.  Typescript will not allow you to partially apply this function.    


```typescript
const fooProp = prop('foo');
//! 'string' is not assignable to parameter of type 'never'. 
```

As far as I know, this is a limitation of the type system.
{% endhint %}





