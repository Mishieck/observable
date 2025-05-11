/**
 * An event record.
 */
export type Event<Name extends string, Payload> = {
  /** The name of the event. */
  name: Name;

  /** The data associated with the event. */
  payload: Payload;
};

/** The event observer. */
export type Observer<Ev extends Event<string, unknown>> = (event: Ev) => void;

/**
 * A record of observers. The keys of the record are event names and the values
 * are sets of event observers. Sets are used to make sure that no event
 * observer is added more than once.
 */
export type Observers<
  EventName extends string,
  Events extends Record<EventName, unknown>,
> = { [Key in EventName]: Set<Observer<Event<Key, Events[Key]>>> };

/**
 * An observable which implements the Observer Pattern. An observable object
 * has activities that are of interest to other entities. This object emits
 * that are aimed at notifying other entities of its activity. An event may
 * have data associated with it
 */
export class Observable<
  EventName extends string,
  Events extends Record<EventName, unknown>,
> {
  /**
   * A record of observers.
   */
  #observers: Observers<EventName, Events>;

  /**
   * @param eventNames An array containing all names of events emitted by an
   * observer.
   */
  constructor(eventNames: Array<EventName>) {
    // Initialize the observer record to empty sets.
    this.#observers = eventNames
      .reduce(
        (observers, name) => ({
          ...observers,
          [name]: new Set(),
        }),
        {} as Partial<Observers<EventName, Events>>,
      ) as Observers<EventName, Events>;
  }

  /**
   * Adds an observer to the observer record so that the observer can be called
   * when the event to which it is subscribed is emitted.
   *
   * @param event The event to which the `observer` would like to subscribe.
   * @param observer The observer which would like to subscribe to an event.
   */
  addObserver<Ev extends EventName>(
    event: Ev,
    observer: Observer<Event<Ev, Events[Ev]>>,
  ): void {
    this.#observers[event].add(observer);
  }

  /**
   * Removes an even observer from the observer record. After the removal, the
   * observer can no longer receive the events emitted.
   *
   * @param event The event to which the `observer` would like to subscribe.
   * @param observer The observer which should be removed from the observer
   * record.
   */
  removeObserver<Ev extends EventName>(
    event: Ev,
    observer: Observer<Event<Ev, Events[Ev]>>,
  ): void {
    this.#observers[event].delete(observer);
  }

  /**
   * Notifies event observers of an event that has been emitted.
   *
   * @param event The event to emit.
   * @param payload The data associated with the event.
   */
  notifyObservers<Ev extends EventName>(
    event: Ev,
    payload: Events[Ev],
  ): void {
    for (const notify of this.#observers[event]) {
      notify({ name: event, payload });
    }
  }
}
