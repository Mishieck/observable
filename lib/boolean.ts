import { Observable, ObservablePrimitiveInterface } from "./observable.ts";

export class $Boolean extends Boolean
  implements ObservablePrimitiveInterface<Boolean, boolean> {
  private observable: Observable<Boolean>;

  constructor(value: Boolean | boolean) {
    super(value);
    this.observable = new Observable<Boolean>(value);
  }

  get current() {
    return this.observable.current;
  }

  set current(value: Boolean) {
    this.observable.current = value;
  }

  toPrimitive() {
    return Boolean(this);
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
