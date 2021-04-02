# Chapter 06: Example Application

The only "new" concept here is the `prop` function. As far as I can tell, [`fp-ts` does not provide an equivalent function](https://github.com/gcanti/fp-ts/issues/799). A more powerful library called [monocle-ts](https://github.com/gcanti/monocle-ts) is recommended.

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
This implementation has some limitations. Typescript will not allow you to partially apply this function.

```typescript
const fooProp = prop('foo');
//! 'string' is not assignable to parameter of type 'never'.
```

As far as I know, this is a limitation of the type system.
{% endhint %}

A translation of the example from the book using `fp-ts`:

{% tabs %}
{% tab title="book" %}
```javascript
const Impure = {
  getJSON: curry((callback, url) => $.getJSON(url, callback)),
  setHtml: curry((sel, html) => $(sel).html(html)),
  trace: curry((tag, x) => { console.log(tag, x); return x; }),
};

const host = 'api.flickr.com';
const path = '/services/feeds/photos_public.gne';
const query = t => `?tags=${t}&format=json&jsoncallback=?`;
const url = t => `https://${host}${path}${query(t)}`;

const mediaUrl = compose(prop('m'), prop('media'));
const mediaUrls = compose(map(mediaUrl), prop('items'));

const img = src => $('<img />', { src });

const images = compose(map(img), mediaUrls);
const render = compose(Impure.setHtml('#js-main'), images);
const app = compose(Impure.getJSON(render), url);
```
{% endtab %}

{% tab title="ts" %}
```typescript
import * as A from 'fp-ts/ReadonlyArray';
import { flow } from 'fp-ts/function';
import $ from 'jquery';

const Impure = {
  getJSON: <T>(callback: (res: T) => void) => (url: string) => {
    $.getJSON(url, callback);
  },
  setHtml: (sel: string) => (html: any) => $(sel).html(html),
  trace: (tag: string) => <T>(x: T) => {
    console.log(tag, x);
    return x;
  },
};

const host = 'api.flickr.com';
const path = '/services/feeds/photos_public.gne';
const query = (t: string) => `?tags=${t}&format=json&jsoncallback=?`;
const url = (t: string) => `https://${host}${path}${query(t)}`;

type MediaItem = {
  media: {
    m: string;
  };
};

type ApiResponse = {
  items: MediaItem[];
};

const mediaUrl: (item: MediaItem) => string = flow(prop('media'), prop('m'));
const mediaUrls: (res: ApiResponse) => readonly string[] = flow(prop('items'), A.map(mediaUrl));

const img = (src: string) => $('<img />', { src });
const images = flow(mediaUrls, A.map(img));

const render = flow(images, Impure.setHtml('#js-main'));
const app = flow(url, Impure.getJSON(render));

app('cats');
```
{% endtab %}
{% endtabs %}

[Open in CodeSandbox.io!](https://codesandbox.io/s/ch6-example-app-gblqk)

