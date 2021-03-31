# Chapter 10: Applicative Functors

## Apply

{% tabs %}
{% tab title="book" %}
```javascript
Maybe.of(add).ap(Maybe.of(2)).ap(Maybe.of(3));
// Maybe(5)

// Http.get :: String -> Task Error HTML

const renderPage = curry((destinations, events) => { /* render page */ });

Task.of(renderPage).ap(Http.get('/destinations')).ap(Http.get('/events'));
// Task("<div>some page with dest and events</div>")
```
{% endtab %}

{% tab title="ts" %}
```typescript
import { pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import * as TE from 'fp-ts/TaskEither';

pipe(O.of(add), O.ap(O.of(2)), O.ap(O.of(3)));

// Http.get :: String -> Task Error HTML
const Http = {
  get: (url: string) => TE.of(url),
};

// renderPage :: String -> String -> String
const renderPage = (destinations: string) => (events: string) => {
  return `<div>${destinations}${events}<div>`;
};

pipe(TE.of(renderPage), TE.ap(Http.get('/destinations')), TE.ap(Http.get('/events')));

// Task("<div>some page with dest and events</div>")


```
{% endtab %}
{% endtabs %}

