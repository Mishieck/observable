import { describe, it } from "@std/testing";
import { expect } from "@std/expect";
import { Observer } from "./observable.ts";
import { $Boolean } from "./boolean.ts";

describe("$Boolean", () => {
  it("should create observable", () => {
    const observableBoolean = new $Boolean(true);
    expect(Boolean(observableBoolean.current)).toEqual(true);
  });

  it("should observe boolean", () => {
    const observableBoolean = new $Boolean(true);
    let current = observableBoolean.current;

    const setCurrent: Observer<Boolean> = (value) => {
      current = value;
    };

    expect(Boolean(current)).toEqual(true);
    observableBoolean.addObserver(setCurrent);
    observableBoolean.notifyObservers(false);
    expect(current).toEqual(false);
  });

  it("should remove observers", () => {
    const observableBoolean = new $Boolean(true);
    let current = observableBoolean.current;

    const setCurrent: Observer<Boolean> = (value) => {
      current = value;
    };

    expect(Boolean(current)).toEqual(true);
    observableBoolean.addObserver(setCurrent);
    observableBoolean.removeObserver(setCurrent);
    observableBoolean.notifyObservers(false);
    expect(Boolean(current)).toEqual(true);
  });
});
