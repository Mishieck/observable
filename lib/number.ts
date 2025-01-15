import { Observable, ObservableValue } from "./observable.ts";

export class $Number extends Number implements Observable<Number> {
  #observable: Observable<Number>;

  constructor(value: Number | number) {
    super(value);
    this.#observable = new ObservableValue<Number>(new Number(value));
  }

  get $current() {
    return this.#observable.$current;
  }

  get $addObserver() {
    return this.#observable.$addObserver.bind(this.#observable);
  }

  get $removeObserver() {
    return this.#observable.$removeObserver.bind(this.#observable);
  }

  get $notifyObservers() {
    return this.#observable.$notifyObservers.bind(this.#observable);
  }
}
