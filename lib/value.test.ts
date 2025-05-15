import { describe, it } from "@std/testing";
import {
  DerivedValue,
  type Deriver,
  Value,
  type ValueObserver,
} from "./value.ts";
import { expect } from "@std/expect";

describe("Value", () => {
  it("should handle observation", () => {
    let result = false;
    const value = new Value(result);

    const setValue: ValueObserver<boolean> = (payload) => {
      result = payload;
    };

    value.observe(setValue);

    value.current = true;
    expect(result).toEqual(true);
    expect(value.current).toEqual(true);
    expect(value.current).toEqual(true);

    value.current = false;
    expect(result).toEqual(false);
    expect(value.current).toEqual(false);
    expect(value.current).toEqual(false);
  });
});

describe("DerivedValue", () => {
  it("should handle observation", () => {
    const value = new Value(0);

    const isEven: Deriver<number, boolean> = (value): boolean =>
      value % 2 === 0;

    const parityValue = new DerivedValue(value, isEven);

    expect(parityValue.current).toEqual(true);
    value.current = 1;
    expect(parityValue.current).toEqual(false);
    value.current = 2;
    expect(parityValue.current).toEqual(true);
    parityValue.current = false;
    expect(parityValue.current).toEqual(true);
  });
});
