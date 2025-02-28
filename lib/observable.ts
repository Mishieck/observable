export type Observer<Value> = (value: Value) => void | Promise<void>;

export type ObservableInterface<Value> = {
  current: Value;
  addObserver: (observe: Observer<Value>) => void;
  removeObserver: (observe: Observer<Value>) => void;
  notifyObservers: (value: Value) => void;
};

export class Observable<Value> implements ObservableInterface<Value> {
  private _current: Value;
  private observers = new Set<Observer<Value>>();

  constructor(value: Value) {
    this._current = value;
  }

  get current() {
    return this._current;
  }

  set current(value: Value) {
    this.notifyObservers(value);
  }

  addObserver(observe: Observer<Value>) {
    if (!this.observers.has(observe)) this.observers.add(observe);
  }

  removeObserver(observe: Observer<Value>) {
    this.observers.delete(observe);
  }

  notifyObservers(value: Value) {
    this._current = value;
    for (const notify of this.observers) notify(value);
  }
}
