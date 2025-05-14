import { type Event, Observable, type Observer } from "./observable.ts";

/** The only event of primitive values. */
export type PrimitiveEvent = "update";

/** The observer of a primitive observable value. */
export type PrimitiveObserver<Value> = (value: Value) => void;

/** A function that derives one value from another. */
export type Deriver<Value, DerivedValue> = (value: Value) => DerivedValue;

export class Primitive<Value>
  extends Observable<PrimitiveEvent, Record<PrimitiveEvent, Value>> {
  /** The current primitive value. This is the value that gets observed. */
  #value: Value;

  /**
   * A map of observers. The keys are the `PrimitiveObserver`s and the values
   * are `Observer`s. The `Observer`s wrap `PrimitiveObserver`s to make them
   * compatible with `Observable`.
   */
  #observers = new Map<
    PrimitiveObserver<Value>,
    Observer<Event<PrimitiveEvent, Value>>
  >();

  constructor(value: Value) {
    super(["update"]);
    this.#value = value;
  }

  /**
   * The current primitive value.
   */
  get current(): Value {
    return this.#value;
  }

  /**
   * The current primitive value. Setting this value triggers an event emission.
   */
  set current(value: Value) {
    this.#value = value;
    this.notify(value);
  }

  /** Subscribes a `PrimitiveObserver`. */
  observe(observe: PrimitiveObserver<Value>) {
    this.addObserver("update", ({ payload }) => observe(payload));
  }

  /** Unsubscribes a `PrimitiveObserver`. */
  unobserve(observe: PrimitiveObserver<Value>) {
    const observer = this.#observers.get(observe);
    if (!observer) return;
    this.removeObserver("update", observer);
    this.#observers.delete(observe);
  }

  /** Emits the 'update' event to `PrimitiveObservers`. */
  notify(value: Value) {
    this.notifyObservers("update", value);
  }
}

/** Derives a primitive value from another primitive value. */
export class DerivedPrimitive<BaseValue, DerivedValue>
  extends Primitive<DerivedValue> {
  #baseValue: Primitive<BaseValue>;
  #derive: Deriver<BaseValue, DerivedValue>;

  constructor(
    baseValue: Primitive<BaseValue>,
    derive: Deriver<BaseValue, DerivedValue>,
  ) {
    super(derive(baseValue.current));
    this.#baseValue = baseValue;
    this.#derive = derive;
    this.#baseValue.observe((value) => this.notify(this.#derive(value)));
  }

  /**
   * The derived current value. The `Deriver` is used to derive the current
   * value from the `Primitive` value used.
   */
  override get current(): DerivedValue {
    return this.#derive(this.#baseValue.current);
  }

  /** Since the value is derived. Setting this value has no effect. */
  override set current(_value: DerivedValue) {
  }
}
