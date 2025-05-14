import { type Event, Observable, type Observer } from "./observable.ts";

export type ArrayMutationMethodName =
  | "copyWithin"
  | "fill"
  | "pop"
  | "push"
  | "reverse"
  | "shift"
  | "splice"
  | "sort"
  | "unshift";

export type ArrayEventName = "length" | ArrayMutationMethodName;
export type LengthEvent = Event<"length", number>;
export type ArrayObserver = Observer<LengthEvent>;

export type ArrayMutationTrait<Element> = Pick<
  ArrayMethods<Element>,
  ArrayMutationMethodName
>;

export type ArrayEventRecord<Element extends unknown> =
  & { length: number }
  & {
    [Key in ArrayMutationMethodName]: ReturnType<
      ArrayMutationTrait<Element>[Key]
    >;
  };

export type ArrayMethods<Element> =
  & { length: number }
  & {
    [Key in keyof Array<Element>]: Array<Element>[Key] extends CallableFunction
      ? Array<Element>[Key]
      : void;
  };

export class ObservableArray<Element>
  extends Observable<ArrayEventName, ArrayEventRecord<Element>>
  implements ArrayMutationTrait<Element> {
  current: Array<Element>;

  constructor(array: Array<Element>) {
    super([
      "copyWithin",
      "fill",
      "length",
      "pop",
      "push",
      "reverse",
      "shift",
      "splice",
      "sort",
      "unshift",
    ]);

    this.current = array;
  }

  get length(): number {
    return this.current.length;
  }

  set length(length: number) {
    this.current.length = length;
    this.notifyObservers("length", length);
  }

  copyWithin(target: number, start: number, end?: number): Element[] {
    this.notifyObservers(
      "copyWithin",
      this.current.copyWithin(target, start, end),
    );

    return this.current;
  }

  fill(value: Element, start?: number, end?: number): Element[] {
    this.notifyObservers(
      "fill",
      this.current.fill(...([value, start, end] as const)),
    );

    return this.current;
  }

  pop(): Element | undefined {
    const element = this.current.pop();
    this.notifyObservers("pop", element);
    return element;
  }

  push(...items: Element[]): number {
    const result = this.current.push(...items);
    this.notifyObservers("push", result);
    return result;
  }

  reverse(): Element[] {
    this.notifyObservers("reverse", this.current.reverse());
    return this.current;
  }

  shift(): Element | undefined {
    const element = this.current.shift();
    this.notifyObservers("shift", element);
    return element;
  }

  splice(start: unknown, deleteCount?: unknown, ...rest: unknown[]): Element[] {
    const elements = this.current.splice(
      start as number,
      deleteCount as number,
      ...(rest ?? []) as Array<Element>,
    );

    this.notifyObservers("splice", elements);
    return elements;
  }

  sort(
    compareFn?: ((a: Element, b: Element) => number) | undefined,
  ): Element[] {
    this.notifyObservers("sort", this.current.sort(compareFn));
    return this.current;
  }

  unshift(...items: Element[]): number {
    const result = this.current.unshift(...items);
    this.notifyObservers("unshift", result);
    return result;
  }
}
