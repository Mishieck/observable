# Observable

A library that provides classes that implement the Observer Pattern.

## Usage

```ts
import { Event, Observable, Observer } from "@mishieck/observable";

type EventName = 'change' | 'submit';
type ChangeEvent = Event<'change', string>;
type SubmitEvent = Event<'submit', string>;
type InputObserver = Observer<ChangeEvent | SubmitEvent>;
type InputEventRecord = Record<EventName, string>;

const observableInput = new Observable<EventName, InputEventRecord>(
  ['change', 'submit']
);

const observeChange: Observer<ChangeEvent> = ({name, payload}) => {
  // TODO: Implement
};

const observeSubmit: Observer<SubmitEvent> = ({name, payload}) => {
  // TODO: Implement
};

observableInput.addObserver('change', observeChange);
observableInput.addObserver('submit', observeSubmit);

observableInput.notifyObservers('change', 'O'); // observeChange gets called
observableInput.notifyObservers('submit', 'Observable'); // observeSubmit gets called

observableInput.removeObserver('change', observeChange);
observableInput.notifyObservers('change', 'Ob'); // No observer is called
```
