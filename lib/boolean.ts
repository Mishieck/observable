import { Observable, ObservableValue } from "./observable.ts";

export class $Boolean extends Boolean implements Observable<Boolean> {
  #observable: Observable<Boolean>;

  constructor(value: Boolean | boolean) {
    super(value);
    this.#observable = new ObservableValue<Boolean>(new Boolean(value));
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
