---
description: Intro
---

# Chapter 1

There's nothing specific to `fp-ts` to show in this chapter, but just to introduce the format we will be using, here's the seagull example:

{% tabs %}
{% tab title="book" %}
```javascript
class Flock {
  constructor(n) {
    this.seagulls = n;
  }

  conjoin(other) {
    this.seagulls += other.seagulls;
    return this;
  }

  breed(other) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
  }
}

const flockA = new Flock(4);
const flockB = new Flock(2);
const flockC = new Flock(0);
const result = flockA
  .conjoin(flockC)
  .breed(flockB)
  .conjoin(flockA.breed(flockB))
  .seagulls;
// 32
```
{% endtab %}

{% tab title="ts" %}
```typescript
class Flock {
  public seagulls: number;
  constructor(n: number) {
    this.seagulls = n;
  }

  conjoin(other: Flock) {
    this.seagulls += other.seagulls;
    return this;
  }

  breed(other: Flock) {
    this.seagulls = this.seagulls * other.seagulls;
    return this;
  }
}

const flockA = new Flock(4);
const flockB = new Flock(2);
const flockC = new Flock(0);
const result = flockA
  .conjoin(flockC)
  .breed(flockB)
  .conjoin(flockA.breed(flockB))
  .seagulls;
// 32
```
{% endtab %}
{% endtabs %}

{% hint style="success" %}
We will skip the next two chapters as there is really nothing specific to `ts-fp` to cover
{% endhint %}

