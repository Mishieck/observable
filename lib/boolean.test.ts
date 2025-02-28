import { describe, it } from "@std/testing";
import { expect } from "@std/expect";
import { Observer } from "./observable.ts";
import { $Boolean } from "./boolean.ts";

describe("$Boolean", () => {
  it("should create observable", () => {
    const observableBoolean = new $Boolean(true);
    expect(Boolean(observableBoolean.current)).toEqual(true);
  });

  it("should convert to primitive value", () => {
    const observableBoolean = new $Boolean(true);
    const primitiveBoolean = observableBoolean.toPrimitive();
    expect(primitiveBoolean).toEqual(true);
  });

  it("should observe boolean", () => {
    const observableBoolean = new $Boolean(true);
    let current = observableBoolean.current;

    const setCurrent: Observer<Boolean> = (value) => {
      current = value;
    };

    expect(Boolean(current)).toEqual(true);
    observableBoolean.addObserver(setCurrent);
    observableBoolean.current = false;
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
    observableBoolean.current = false;
    expect(Boolean(current)).toEqual(true);
  });
});
