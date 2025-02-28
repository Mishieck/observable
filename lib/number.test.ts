import { describe, it } from "@std/testing";
import { expect } from "@std/expect";
import { Observer } from "./observable.ts";
import { $Number } from "./number.ts";

describe("$Number", () => {
  it("should create observable", () => {
    const observableNumber = new $Number(1);
    expect(Number(observableNumber.current)).toEqual(1);
  });

  it("should convert to primitive value", () => {
    const observableNumber = new $Number(1);
    const primitiveNumber = observableNumber.toPrimitive();
    expect(primitiveNumber).toEqual(1);
  });

  it("should observe number", () => {
    const observableNumber = new $Number(1);
    let current = observableNumber.current;

    const setCurrent: Observer<Number> = (value) => {
      current = value;
    };

    expect(Number(current)).toEqual(1);
    observableNumber.addObserver(setCurrent);
    observableNumber.notifyObservers(2);
    expect(current).toEqual(2);
  });

  it("should remove observers", () => {
    const observableNumber = new $Number(1);
    let current = observableNumber.current;

    const setCurrent: Observer<Number> = (value) => {
      current = value;
    };

    expect(Number(current)).toEqual(1);
    observableNumber.addObserver(setCurrent);
    observableNumber.removeObserver(setCurrent);
    observableNumber.notifyObservers(2);
    expect(Number(current)).toEqual(1);
  });
});
