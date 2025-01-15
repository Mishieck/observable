import { describe, it } from "@std/testing";
import { expect } from "@std/expect";
import { Observable, ObservableValue, Observer } from "./observable.ts";

describe("ObservableValue", () => {
  it("should create observer", () => {
    const observableBoolean = new ObservableValue(true);
    expect(observableBoolean.$current).toEqual(true);
  });

  it("should observe value", () => {
    const observableBoolean = new ObservableValue(true);
    let current = observableBoolean.$current;
    const setCurrent: Observer<boolean> = (value) => current = value;
    expect(current).toEqual(true);
    observableBoolean.$addObserver(setCurrent);
    observableBoolean.$notifyObservers(false);
    expect(current).toEqual(false);
  });

  it("should remove observers", () => {
    const observableBoolean = new ObservableValue(true);
    let current = observableBoolean.$current;
    const setCurrent: Observer<boolean> = (value) => current = value;
    expect(current).toEqual(true);
    observableBoolean.$addObserver(setCurrent);
    observableBoolean.$removeObserver(setCurrent);
    observableBoolean.$notifyObservers(false);
    expect(current).toEqual(true);
  });
});

describe("Observable", () => {
  type Value = { id: string };

  class $Value implements Observable<Value> {
    #observable: Observable<Value>;

    constructor(value: Value) {
      this.#observable = new ObservableValue<Value>(value);
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

  it("should create observer", () => {
    const observableValue = new $Value({ id: "1" });
    expect(observableValue.$current).toEqual({ id: "1" });
  });

  it("should observe value", () => {
    const observableValue = new $Value({ id: "1" });
    let current = observableValue.$current;
    const setCurrent: Observer<Value> = (value) => current = value;
    expect(current).toEqual({ id: "1" });
    observableValue.$addObserver(setCurrent);
    observableValue.$notifyObservers({ id: "2" });
    expect(current).toEqual({ id: "2" });
  });

  it("should remove observers", () => {
    const observableValue = new $Value({ id: "1" });
    let current = observableValue.$current;
    const setCurrent: Observer<Value> = (value) => current = value;
    expect(current).toEqual({ id: "1" });
    observableValue.$addObserver(setCurrent);
    observableValue.$removeObserver(setCurrent);
    observableValue.$notifyObservers({ id: "2" });
    expect(current).toEqual({ id: "1" });
  });
});
