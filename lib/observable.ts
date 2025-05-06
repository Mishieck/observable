export type Event<Name extends string, Payload> = {
  name: Name;
  payload: Payload;
};

export type Observer<Ev extends Event<string, unknown>> = (event: Ev) => void;

export type Observers<
  EventName extends string,
  Events extends Record<EventName, unknown>,
> = { [Key in EventName]: Set<Observer<Event<Key, Events[Key]>>> };

export class Observable<
  EventName extends string,
  Events extends Record<EventName, unknown>,
> {
  #observers: Observers<EventName, Events>;

  constructor(eventNames: Array<EventName>) {
    this.#observers = eventNames
      .reduce(
        (observers, name) => ({
          ...observers,
          [name]: new Set(),
        }),
        {} as Partial<Observers<EventName, Events>>,
      ) as Observers<EventName, Events>;
  }

  addObserver<Ev extends EventName>(
    event: Ev,
    observer: Observer<Event<Ev, Events[Ev]>>,
  ): void {
    this.#observers[event].add(observer);
  }

  removeObserver<Ev extends EventName>(
    event: Ev,
    observer: Observer<Event<Ev, Events[Ev]>>,
  ): void {
    this.#observers[event].delete(observer);
  }

  notifyObservers<Ev extends EventName>(
    event: Ev,
    payload: Events[Ev],
  ): void {
    for (const notify of this.#observers[event]) {
      notify({ name: event, payload });
    }
  }
}
