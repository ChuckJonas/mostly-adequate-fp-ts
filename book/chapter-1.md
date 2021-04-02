# Chapter 01: What Ever Are We Doing?

There's nothing specific to `fp-ts` to show in this chapter, but here is the "seagull example" to introduce the form we will use in this guide:

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
We will skip the next two chapters as there is nothing specific to `fp-ts` to cover
{% endhint %}

