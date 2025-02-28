import { describe, it } from "@std/testing";
import { expect } from "@std/expect";
import { Observable, Observer } from "./observable.ts";

describe("ObservableValue", () => {
  it("should create observable", () => {
    const observableBoolean = new Observable(true);
    expect(observableBoolean.current).toEqual(true);
  });

  it("should observe value", () => {
    const observableBoolean = new Observable(true);
    let current = observableBoolean.current;

    const setCurrent: Observer<boolean> = (value) => {
      current = value;
    };

    expect(current).toEqual(true);
    observableBoolean.addObserver(setCurrent);
    observableBoolean.current = false;
    expect(current).toEqual(false);
  });

  it("should remove observers", () => {
    const observableBoolean = new Observable(true);
    let current = observableBoolean.current;

    const setCurrent: Observer<boolean> = (value) => {
      current = value;
    };

    expect(current).toEqual(true);
    observableBoolean.addObserver(setCurrent);
    observableBoolean.removeObserver(setCurrent);
    observableBoolean.current = false;
    expect(current).toEqual(true);
  });
});

describe("Observable", () => {
  type User = { id: string };

  class ObservableUser extends Observable<User> {
    constructor(user: User) {
      super(user);
    }
  }

  it("should create observable", () => {
    const observableValue = new ObservableUser({ id: "1" });
    expect(observableValue.current).toEqual({ id: "1" });
  });

  it("should observe value", () => {
    const observableValue = new ObservableUser({ id: "1" });
    let current = observableValue.current;

    const setCurrent: Observer<User> = (value) => {
      current = value;
    };

    expect(current).toEqual({ id: "1" });
    observableValue.addObserver(setCurrent);
    observableValue.current = { id: "2" };
    expect(current).toEqual({ id: "2" });
  });

  it("should remove observers", () => {
    const observableValue = new ObservableUser({ id: "1" });
    let current = observableValue.current;

    const setCurrent: Observer<User> = (value) => {
      current = value;
    };

    expect(current).toEqual({ id: "1" });
    observableValue.addObserver(setCurrent);
    observableValue.removeObserver(setCurrent);
    observableValue.current = { id: "2" };
    expect(current).toEqual({ id: "1" });
  });
});
