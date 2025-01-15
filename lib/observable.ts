export type Observer<Value> = (value: Value) => void;

export type Observable<Value> = {
  $current: Value;
  $addObserver: (observe: Observer<Value>) => void;
  $removeObserver: (observe: Observer<Value>) => void;
  $notifyObservers: (value: Value) => void;
};

export class ObservableValue<Value> implements Observable<Value> {
  $current;
  #observers: Array<Observer<Value>> = [];

  constructor(value: Value) {
    this.$current = value;
  }

  $addObserver(observe: Observer<Value>) {
    if (this.#observers.includes(observe)) return;
    this.#observers.push(observe);
  }

  $removeObserver(observe: Observer<Value>) {
    const index = this.#observers.indexOf(observe);
    this.#observers.splice(index, 1);
  }

  $notifyObservers(value: Value) {
    this.$current = value;
    for (const notify of this.#observers) notify(value);
  }
}
