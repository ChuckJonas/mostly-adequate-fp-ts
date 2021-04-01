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
import * as TE from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";

declare const Http: {
  get: (url: string) => TE.TaskEither<Error, string>
}

const renderPage = (destinations: string) => (events: string) => {
  return `<div>${destinations}${events}<div>`;
};

pipe(
  TE.right(renderPage),
  TE.ap(Http.get("/destinations")),
  TE.ap(Http.get("/events"))
);
```
{% endtab %}
{% endtabs %}



