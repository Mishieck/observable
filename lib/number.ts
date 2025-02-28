import { Observable, ObservablePrimitiveInterface } from "./observable.ts";

export class $Number extends Number
  implements ObservablePrimitiveInterface<Number, number> {
  private observable: Observable<Number>;

  constructor(value: Number) {
    super(value);
    this.observable = new Observable<Number>(new Number(value));
  }

  get current() {
    return this.observable.current;
  }

  set current(value: Number) {
    this.observable.current = value;
  }

  toPrimitive() {
    return Number(this);
  }

  get addObserver() {
    return this.observable.addObserver.bind(this.observable);
  }

  get removeObserver() {
    return this.observable.removeObserver.bind(this.observable);
  }

  get notifyObservers() {
    return this.observable.notifyObservers.bind(this.observable);
  }
}
