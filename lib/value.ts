import { type Event, Observable, type Observer } from "./observable.ts";

/** The only event of values. */
export type ValueEvent = "update";

/** The observer of a observable value. */
export type ValueObserver<Value> = (value: Value) => void;

/** A function that derives one value from another. */
export type Deriver<Value, DerivedValue> = (value: Value) => DerivedValue;

export class Value<Value>
  extends Observable<ValueEvent, Record<ValueEvent, Value>> {
  /** The current value. This is the value that gets observed. */
  #current: Value;

  /**
   * A map of observers. The keys are the `ValueObserver`s and the values
   * are `Observer`s. The `Observer`s wrap `ValueObserver`s to make them
   * compatible with `Observable`.
   */
  #observers = new Map<
    ValueObserver<Value>,
    Observer<Event<ValueEvent, Value>>
  >();

  constructor(value: Value) {
    super(["update"]);
    this.#current = value;
  }

  /**
   * The current value.
   */
  get current(): Value {
    return this.#current;
  }

  /**
   * The current value. Setting this value triggers an event emission.
   */
  set current(value: Value) {
    this.#current = value;
    this.notify(value);
  }

  /** Subscribes a `ValueObserver`. */
  observe(observe: ValueObserver<Value>) {
    this.addObserver("update", ({ payload }) => observe(payload));
  }

  /** Unsubscribes a `ValueObserver`. */
  unobserve(observe: ValueObserver<Value>) {
    const observer = this.#observers.get(observe);
    if (!observer) return;
    this.removeObserver("update", observer);
    this.#observers.delete(observe);
  }

  /** Emits the 'update' event to `ValueObservers`. */
  notify(value: Value) {
    this.notifyObservers("update", value);
  }
}

/** Derives a value from another value. */
export class DerivedValue<BaseValue, DerivedValue> extends Value<DerivedValue> {
  #baseValue: Value<BaseValue>;
  #derive: Deriver<BaseValue, DerivedValue>;

  constructor(
    baseValue: Value<BaseValue>,
    derive: Deriver<BaseValue, DerivedValue>,
  ) {
    super(derive(baseValue.current));
    this.#baseValue = baseValue;
    this.#derive = derive;
    this.#baseValue.observe((value) => this.notify(this.#derive(value)));
  }

  /**
   * The derived current value. The `Deriver` is used to derive the current
   * value from the `Value` value used.
   */
  override get current(): DerivedValue {
    return this.#derive(this.#baseValue.current);
  }

  /** Since the value is derived. Setting this value has no effect. */
  override set current(_value: DerivedValue) {
  }
}
